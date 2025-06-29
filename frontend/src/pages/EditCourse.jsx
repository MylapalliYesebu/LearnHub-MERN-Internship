import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/axios';
import TeacherNavbar from '../components/TeacherNavbar';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    C_category: '',
    C_title: '',
    C_description: '',
    C_price: 0,
  });

  const [sections, setSections] = useState([]);

  // Load course data on mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        const { C_category, C_title, C_description, C_price, sections } = res.data;
        setForm({ C_category, C_title, C_description, C_price });
        setSections(sections || []);
      } catch (err) {
        alert('Failed to load course details');
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const removeSection = (index) => {
    if (sections.length === 1) return; 
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/courses/${id}`, { ...form, sections });
      alert('Course updated successfully');
      navigate('/teacher/courses');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherNavbar />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Edit Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="C_category"
            placeholder="Category"
            value={form.C_category}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="C_title"
            placeholder="Title"
            value={form.C_title}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            name="C_description"
            placeholder="Description"
            value={form.C_description}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="C_price"
            placeholder="Price"
            value={form.C_price}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <h4 className="text-lg font-semibold text-gray-700 mt-4">Sections</h4>
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold text-gray-700">Section {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  disabled={sections.length === 1}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  ❌ Remove
                </button>
              </div>
              <input
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                required
                className="w-full border rounded px-3 py-2 mb-2"
              />
              <input
                placeholder="Section Content"
                value={section.content}
                onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addSection}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            + Add Section
          </button>

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
