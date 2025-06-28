import { useState } from 'react';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import TeacherNavbar from '../components/TeacherNavbar';

const AddCourse = () => {
  const [form, setForm] = useState({
    C_category: '',
    C_title: '',
    C_description: '',
    C_price: 0,
  });

  const [sections, setSections] = useState([{ title: '', content: '' }]);
  const navigate = useNavigate();

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
    if (sections.length === 1) {
      alert("At least one section is required.");
      return;
    }
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses', { ...form, sections });
      alert('Course created successfully');
      navigate('/teacher/courses');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create course');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <TeacherNavbar />

      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Create New Course</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category Dropdown */}
          <select
            name="C_category"
            value={form.C_category}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2 bg-white"
          >
            <option value="">-- Select Category --</option>
            <option value="Full Stack Development">Full Stack Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Frontend Development">Web Development (Frontend)</option>
            <option value="Game Development">Game Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Data Management & Analysis">Data Management & Analysis</option>
            <option value="Programming & Software Development">Programming & Software Development</option>
            <option value="Foundations of Computing">Foundations of Computing</option>
          </select>

          {/* Basic Inputs */}
          <input
            name="C_title"
            placeholder="Course Title"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <textarea
            name="C_description"
            placeholder="Course Description"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="number"
            name="C_price"
            placeholder="Price"
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />

          <h4 className="text-lg font-semibold text-gray-700 mt-4">Sections</h4>

          {/* Sections Block */}
          {sections.map((section, index) => (
            <div key={index} className="border p-4 rounded mb-3 bg-gray-50 relative">
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

              {/* ❌ Remove Section Button */}
              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs rounded"
                >
                  Remove
                </button>
              )}
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
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
