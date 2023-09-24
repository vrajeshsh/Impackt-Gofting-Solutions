import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';
import axios from "axios";

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name,setName] = useState('');
  const [parentCategory,setParentCategory] = useState('');
  const [categories,setCategories] = useState([]);
  const [properties,setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, [])
  function fetchCategories() {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      parentCategory,
      properties:properties.map(p => ({
        name:p.name,
        values:p.values.split(','),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  }

  function editCategory(category){
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map(({name,values}) => ({
      name,
      values:values.join(',')
    }))
    );
  }

  function deleteCategory(category){
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id);
        fetchCategories();
      }
    });
  }
  return (
    <Layout>
    <h1>Categories</h1>
    <label>{editedCategory?`Editing: ${editedCategory.name}`: 'Create new category'}</label>
    <form onSubmit={saveCategory} >
      <div className="flex gap-1"> 
      <input type="text" placeholder={'Category name'} onChange={ev => setName(ev.target.value)} value={name}/>
    <select value={parentCategory} onChange={ev => setParentCategory(ev.target.value)}>
      <option value="">No parent category</option>
      {categories.length>0 && categories.map(category => (
          <option value={category._id}>{category.name}</option>
        ))}
    </select>
      </div>
    <div className="mb-2">
      <label className="block">
        Properties
      </label>
      <button className="btn-default text-sm">Add new property</button>
    </div>
    <button type="submit" className="btn-primary py-1">Save</button>
    </form>

    <table className="basic mt-4">
      <thead>
        <tr>
          <td>Category name</td>
          <td>Product category</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {categories.length>0 && categories.map(category => (
          <tr>
            <td>{category.name}</td>
            <td>{category?.parent?.name}</td>
            <td>
              <button onClick={() => editCategory(category)} className="btn-primary mr-1">Edit</button>
              <button onClick={() => deleteCategory(category)}
                  className="btn-red">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
  </Layout>
  );

}

export default withSwal(({swal}, ref) => (
  <Categories swal={swal} />
));