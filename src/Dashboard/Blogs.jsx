import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, fetchBlogs, updateBlog, deleteBlog } from '../redux/blog/blogSlice';

const AddBlog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const [editBlogId, setEditBlogId] = useState(null);

  const formik = useFormik({
    initialValues: {
      imageLink: '',
      heading: '',
      blogDetails: '',
      tags: '',
      showOnHomepage: false,
      featuredPost: false,
    },
    validationSchema: Yup.object({
      imageLink: Yup.string().url('Must be a valid URL').required('Required'),
      heading: Yup.string().required('Required'),
      blogDetails: Yup.string().required('Required'),
      tags: Yup.string().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
        const payload = {
          image: values.imageLink,
          heading: values.heading,
          details: values.blogDetails,
          tags: values.tags.split(',').map(tag => tag.trim()),
          showOnHomepage: values.showOnHomepage,
          featuredPost: values.featuredPost,
        };
      
        if (editBlogId) {
          dispatch(updateBlog({ ...payload, _id: editBlogId }));
          setEditBlogId(null);
        } else {
          dispatch(createBlog(payload));
        }
      
        resetForm();
      },
      
  });

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleEdit = (blog) => {
    formik.setValues({
      imageLink: blog.image,         // map to form field
      heading: blog.heading,
      blogDetails: blog.details,     // map to form field
      tags: blog.tags.join(', '),
      showOnHomepage: blog.showOnHomepage,
      featuredPost: blog.featuredPost,
    });
    setEditBlogId(blog._id);
  };
  

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-bold">{editBlogId ? 'Edit Blog' : 'Add Blog'}</h2>

        <div>
          <label className="block">Image Link</label>
          <input
            name="imageLink"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.imageLink}
            className="border p-2 w-full rounded"
          />
          {formik.touched.imageLink && formik.errors.imageLink && (
            <p className="text-red-500 text-sm">{formik.errors.imageLink}</p>
          )}
        </div>

        <div>
          <label className="block">Heading</label>
          <input
            name="heading"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.heading}
            className="border p-2 w-full rounded"
          />
          {formik.touched.heading && formik.errors.heading && (
            <p className="text-red-500 text-sm">{formik.errors.heading}</p>
          )}
        </div>

        <div>
          <label className="block">Blog Details</label>
          <textarea
            name="blogDetails"
            onChange={formik.handleChange}
            value={formik.values.blogDetails}
            className="border p-2 w-full rounded"
          />
          {formik.touched.blogDetails && formik.errors.blogDetails && (
            <p className="text-red-500 text-sm">{formik.errors.blogDetails}</p>
          )}
        </div>

        <div>
          <label className="block">Tags (comma-separated)</label>
          <input
            name="tags"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.tags}
            className="border p-2 w-full rounded"
          />
          {formik.touched.tags && formik.errors.tags && (
            <p className="text-red-500 text-sm">{formik.errors.tags}</p>
          )}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="showOnHomepage"
              checked={formik.values.showOnHomepage}
              onChange={formik.handleChange}
            />
            Show on Homepage
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featuredPost"
              checked={formik.values.featuredPost}
              onChange={formik.handleChange}
            />
            Featured Post
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editBlogId ? 'Update Blog' : 'Add Blog'}
        </button>
      </form>

      {/* Blog Table */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">All Blogs</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Heading</th>
                <th className="p-2 border">Tags</th>
                <th className="p-2 border">Homepage</th>
                <th className="p-2 border">Featured</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{blog.heading}</td>
                  <td className="p-2 border">{blog.tags.join(', ')}</td>
                  <td className="p-2 border">{blog.showOnHomepage ? 'Yes' : 'No'}</td>
                  <td className="p-2 border">{blog.featuredPost ? 'Yes' : 'No'}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No blogs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
