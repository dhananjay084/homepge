// src/pages/Stores.jsx
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, addStore, deleteStore, updateStore } from '../redux/store/storeSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const storeSchema = Yup.object().shape({
    storeName: Yup.string().required('Store Name is required'),
    storeDescription: Yup.string().required('Store Description is required'),
    storeImage: Yup.string().url('Enter a valid image URL').required('Store image is required'),
    homePageTitle: Yup.string().required('Home Page Title is required'),
    showOnHomepage: Yup.boolean(),
    popularStore: Yup.boolean(),
    storeType: Yup.string().required('Store Type is required'),
    discountPercentage: Yup.number()
      .typeError('Must be a number')
      .required('Discount Percentage is required'),
    storeHtmlContent: Yup.string().required('HTML Content is required'),
  });
  

const Stores = () => {
  const dispatch = useDispatch();
  const { stores = [], loading } = useSelector((state) => state.store);
  const [editStore, setEditStore] = useState(null);

  useEffect(() => {
    dispatch(getStores());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteStore(id)).unwrap();
      toast.success('Store deleted!');
      dispatch(getStores());
    } catch {
      toast.error('Failed to delete store');
    }
  };

  const handleEdit = (store) => {
    setEditStore(store);
  };

  const handleUpdate = async (values, resetForm) => {
    
    try {
      await dispatch(updateStore({ id: editStore._id, data: values })).unwrap();
      toast.success('Store updated!');
      resetForm();
      setEditStore(null);
      dispatch(getStores());
    } catch {
      toast.error('Failed to update store');
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Manage Stores</h1>

      {/* ✅ TABLE DISPLAY */}
      {stores.length > 0 && (
        <div className="mb-10 overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Homepage Title</th>
                <th className="p-3 border">Type</th>
                <th className="p-3 border">Discount</th>
                <th className="p-3 border">Show on Homepage</th>
                <th className="p-3 border">Actions</th>
                <th className="p-3 border">Popular</th>
<th className="p-3 border">HTML</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store._id}>
                  <td className="p-3 border">{store.storeName}</td>
                  <td className="p-3 border">{store.storeDescription}</td>

                  <td className="p-3 border">
                    <img src={store.storeImage} alt="store" className="h-12 w-12 object-cover" />
                  </td>
                  <td className="p-3 border">{store.homePageTitle}</td>
                  <td className="p-3 border">{store.storeType}</td>
                  <td className="p-3 border">{store.discountPercentage}%</td>
                  <td className="p-3 border">{store.showOnHomepage ? 'Yes' : 'No'}</td>
                  <td className="p-3 border">{store.popularStore ? 'Yes' : 'No'}</td>
<td className="p-3 border">{store.storeHtmlContent?.substring(0, 50)}...</td>

                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => handleDelete(store._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(store)}
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

      {/* ✅ FORM SECTION */}
      <Formik
        enableReinitialize
        initialValues={
            editStore || {
                storeName: '',
                storeDescription: '',
                storeImage: '',
                homePageTitle: '',
                showOnHomepage: false,
                storeType: '',
                discountPercentage: '',
                popularStore: false,
                storeHtmlContent: '',
              }
        }
        validationSchema={storeSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            if (editStore) {
              await handleUpdate(values, resetForm);
            } else {
              await dispatch(addStore(values)).unwrap();
              toast.success('Store added!');
              resetForm();
              dispatch(getStores());
            }
          } catch {
            toast.error('Submission failed');
          }
        }}
      >
        {() => (
          <Form className="bg-white p-6 shadow-md rounded-lg space-y-6">
            <div>
              <label className="block mb-1 font-medium">Store Name</label>
              <Field name="storeName" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="storeName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Store Description</label>
              <Field
                as="textarea"
                name="storeDescription"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="storeDescription"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Store Image URL</label>
              <Field name="storeImage" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage name="storeImage" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Homepage Title</label>
              <Field name="homePageTitle" className="w-full px-3 py-2 border rounded-md" />
              <ErrorMessage
                name="homePageTitle"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
  <label className="block mb-1 font-medium">Store Type</label>
  <Field
    as="select"
    name="storeType"
    className="w-full px-3 py-2 border rounded-md"
  >
    <option value="">Select Store Type</option>
    <option value="Top">Top</option>
    <option value="Brands">Brands</option>
    <option value="Popular">Popular</option>
    <option value="Popular Store">Popular Store</option>
  </Field>
  <ErrorMessage
    name="storeType"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>


            <div>
              <label className="block mb-1 font-medium">Discount Percentage</label>
              <Field
                name="discountPercentage"
                type="number"
                className="w-full px-3 py-2 border rounded-md"
              />
              <ErrorMessage
                name="discountPercentage"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            {/* ✅ Checkbox: Popular Store */}
<div className="flex items-center space-x-2">
  <Field type="checkbox" name="popularStore" />
  <label className="font-medium">Popular Store</label>
</div>

{/* ✅ Rich Text / HTML Content */}
<div>
  <label className="block mb-1 font-medium">Store HTML Content</label>
  <Field
    as="textarea"
    name="storeHtmlContent"
    className="w-full px-3 py-2 border rounded-md"
    rows={5}
/>
  <ErrorMessage
    name="storeHtmlContent"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>


            <div className="flex items-center space-x-2">
              <Field type="checkbox" name="showOnHomepage" />
              <label className="font-medium">Show on Homepage</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              {loading ? 'Submitting...' : editStore ? 'Update Store' : 'Add Store'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Stores;
