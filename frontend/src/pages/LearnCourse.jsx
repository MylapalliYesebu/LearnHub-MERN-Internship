import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';
import StudentNavbar from '../components/StudentNavbar';
import { AuthContext } from '../context/AuthContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const LearnCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const certRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);

        const completeRes = await axios.get(`/api/student/completed/${id}`);
        setCompletedSections(completeRes.data || []);
      } catch (err) {
        alert('Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const markAsCompleted = async (index) => {
    try {
      await axios.post('/api/student/complete-section', {
        courseId: id,
        sectionIndex: index,
      });
      setCompletedSections((prev) => [...prev, index]);
    } catch (err) {
      alert('Failed to mark section as complete');
    }
  };

  const isYouTubeVideo = (url) =>
    url.includes('youtube.com') || url.includes('youtu.be');

  const convertToEmbedUrl = (url) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    } else if (url.includes('youtu.be')) {
      return url.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    return url;
  };

  const isLink = (url) => url.startsWith('http://') || url.startsWith('https://');

  const handleDownloadCertificate = () => {
    const certElement = certRef.current;
    certElement.style.display = 'block';

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(certElement, {
          scale: 2,
          useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'pt', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`Certificate_${course.C_title}.pdf`);
      } catch (err) {
        alert('❌ Failed to generate certificate.');
        console.error(err);
      } finally {
        certElement.style.display = 'none';
      }
    }, 500);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10 text-red-600">Course not found.</p>;

  const totalSections = course.sections.length;
  const completedCount = completedSections.length;
  const percentage = Math.round((completedCount / totalSections) * 100);
  const allDone = completedCount === totalSections;

  return (
    <div className="min-h-screen bg-gray-100">
      <StudentNavbar />

      <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded mt-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">{course.C_title}</h2>
        <p className="text-gray-700 mb-4">{course.C_description}</p>

        {allDone && (
          <div className="p-4 mb-4 rounded bg-green-100 text-green-700 font-semibold text-center border border-green-300">
            🎉 Congratulations! You have completed the course.
          </div>
        )}

        <div className="w-full bg-gray-200 rounded-full h-5 mb-6 overflow-hidden">
          <div
            className="bg-blue-600 h-5 text-xs text-white text-center transition-all duration-500"
            style={{ width: `${percentage}%` }}
          >
            {percentage}%
          </div>
        </div>

        <h3 className="text-xl font-semibold text-green-700 mb-3">📘 Course Sections</h3>
        {course.sections.map((section, index) => {
          const isCompleted = completedSections.includes(index);
          const isLocked = index > 0 && !completedSections.includes(index - 1);

          return (
            <div
              key={index}
              className={`border p-4 rounded mb-4 ${
                isLocked ? 'bg-gray-100 opacity-70' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">🔹 {section.title}</p>
                <button
                  onClick={() => markAsCompleted(index)}
                  disabled={isCompleted || isLocked}
                  className={`px-3 py-1 text-sm rounded font-medium ${
                    isCompleted
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : isLocked
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCompleted
                    ? 'Completed'
                    : isLocked
                    ? 'Locked 🔒'
                    : 'Mark as Complete'}
                </button>
              </div>

              {!isLocked && (
                <div>
                  {isYouTubeVideo(section.content) ? (
                    <iframe
                      width="100%"
                      height="315"
                      src={convertToEmbedUrl(section.content)}
                      title="Video"
                      allowFullScreen
                      className="rounded"
                    ></iframe>
                  ) : isLink(section.content) ? (
                    <a
                      href={section.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Open Resource ↗
                    </a>
                  ) : (
                    <p className="text-gray-600">{section.content}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="text-center mt-6">
          <button
            onClick={handleDownloadCertificate}
            disabled={!allDone}
            className={`px-6 py-2 rounded font-semibold text-white text-sm ${
              allDone
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {allDone ? 'Download Certificate 🏆' : 'Complete Course to Unlock Certificate'}
          </button>
        </div>
      </div>

      {/* 🔒 Hidden Certificate Template for PDF */}
      <div
        ref={certRef}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          zIndex: -999,
          width: '800px',
          height: '565px',
          padding: '40px',
          fontFamily: 'serif',
          background: '#fefefe',
          textAlign: 'center',
          border: '6px double #999',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2b2b2b' }}>
          🎓 Certificate of Completion
        </h1>
        <p style={{ marginTop: '40px', fontSize: '18px' }}>
          This is to certify that
        </p>
        <h2 style={{ fontSize: '24px', margin: '12px 0', color: '#333' }}>{user?.name}</h2>
        <p style={{ fontSize: '18px' }}>
          has successfully completed the course:
        </p>
        <h2 style={{ fontSize: '22px', margin: '10px 0', color: '#1e3a8a' }}>
          “{course.C_title}”
        </h2>
        <p style={{ fontSize: '16px', marginTop: '30px' }}>
          Issued on: {new Date().toLocaleDateString()}
        </p>
        <p style={{ fontSize: '14px', marginTop: '60px', color: '#555' }}>
          LearnHub — Your Center for Skill Enhancement
        </p>
      </div>
    </div>
  );
};

export default LearnCourse;
