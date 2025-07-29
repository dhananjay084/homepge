import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../redux/category/categorySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categorySchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.string().url('Enter a valid image URL').required('Image URL is required'),
  showOnHomepage: Yup.boolean(),
  popularStore: Yup.boolean(),
});

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      toast.success('Category deleted!');
      dispatch(getCategories());
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditCategory(category);
  };

  const handleUpdate = async (values, resetForm) => {
    try {
      await dispatch(updateCategory({ id: editCategory._id, data: values })).unwrap();
      toast.success('Category updated!');
      resetForm();
      setEditCategory(null);
      dispatch(getCategories());
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {categories.length > 0 && (
        <div className="mb-10 overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Popular Store</th>
                <th className="p-3 border">Show on Homepage</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="p-3 border">{cat.name}</td>
                  <td className="p-3 border">
                    <img src={cat.image} alt={cat.name} className="h-12 w-12 object-cover" />
                  </td>
                  <td className="p-3 border">{cat.popularStore ? 'Yes' : 'No'}</td>
                  <td className="p-3 border">{cat.showOnHomepage ? 'Yes' : 'No'}</td>
                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Formik
        enableReinitialize
        initialValues={
          editCategory || {
            name: '',
            image: '',
            showOnHomepage: false,
            popularStore: false,
          }
        }
        validationSchema={categorySchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (editCategory) {
              await handleUpdate(values, resetForm);
            } else {
              await dispatch(addCategory(values)).unwrap();
              toast.success('Category added!');
              resetForm();
              dispatch(getCategories());
            }
          } catch (err) {
            toast.error('Failed to submit category');
          }
        }}
      >
        {() => (
          <Form className="bg-white p-6 shadow-md rounded-lg space-y-6">
            <div>
              <label className="block mb-1 font-medium">Category Name</label>
              <Field name="name" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <Field name="image" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <Field type="checkbox" name="popularStore" className="mr-2" />
                Popular Store
              </label>

              <label className="flex items-center">
                <Field type="checkbox" name="showOnHomepage" className="mr-2" />
                Show on Homepage
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              {loading ? 'Submitting...' : editCategory ? 'Update Category' : 'Add Category'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Categories;
