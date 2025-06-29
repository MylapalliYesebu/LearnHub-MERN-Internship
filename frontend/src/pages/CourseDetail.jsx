import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import TeacherNavbar from '../components/TeacherNavbar';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        alert('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const renderContent = (content) => {
    if (!content) return <p className="text-gray-500">No content</p>;

    if (content.includes('youtube.com') || content.includes('youtu.be')) {
      const videoId = content.includes('youtube.com')
        ? new URL(content).searchParams.get('v')
        : content.split('/').pop();
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <iframe
          src={embedUrl}
          title="YouTube video"
          className="w-full h-64 mt-2 rounded"
          allowFullScreen
        ></iframe>
      );
    }

    if (content.startsWith('http')) {
      return (
        <a
          href={content}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-2 block"
        >
          🔗 View Resource
        </a>
      );
    }

    return <p className="text-gray-600 mt-1">{content}</p>;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10 text-red-600">Course not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherNavbar />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6 relative">
        {/* Edit Button */}
        <button
          onClick={() => navigate(`/teacher/edit/${course._id}`)}
          className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 font-semibold"
        >
          ✏️ Edit This Course
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-4">{course.C_title}</h2>
        <p className="text-gray-700 mb-2"><strong>Category:</strong> {course.C_category}</p>
        <p className="text-gray-700 mb-2"><strong>Price:</strong> ₹{course.C_price}</p>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {course.C_description}</p>

        {/* Enrolled Students - moved above */}
        <h3 className="text-xl font-semibold text-green-700 mb-2">👥 Enrolled Students</h3>
        {course.enrolled.length === 0 ? (
          <p className="text-gray-500">No students enrolled yet.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1 mb-6">
            {course.enrolled.map((student, i) => (
              <li key={i} className="text-gray-700">
                👤 {student.name} – <span className="text-sm text-gray-500">{student.email}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Course Sections */}
        <h3 className="text-xl font-semibold text-green-700 mb-2">📂 Course Sections</h3>
        {course.sections.length === 0 ? (
          <p className="text-gray-500">No sections added yet.</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {course.sections.map((sec, i) => (
              <li key={i} className="border p-4 rounded bg-gray-50">
                <p className="font-semibold text-lg">🔹 {sec.title}</p>
                {renderContent(sec.content)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
