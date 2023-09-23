import {useState} from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
    category:assignedCategory,
    properties:assignedProperties,
  }) {
    const [title,setTitle] = useState(existingTitle || '');
    const [description,setDescription] = useState(existingDescription || '');
    const [category,setCategory] = useState(assignedCategory || '');
    const [productProperties,setProductProperties] = useState(assignedProperties || {});
    const [price,setPrice] = useState(existingPrice || '');
    const [images,setImages] = useState(existingImages || []);
    const [goToProducts,setGoToProducts] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [categories,setCategories] = useState([]);
    const router = useRouter();

    async function saveProduct(ev){
        ev.preventDefault();
        const data = {title, description, price};
        if (_id) {
            //update
            await axios.put('/api/products', {...data,_id});
          } else {
            //create
            await axios.post('/api/products', data);
          }
        setGoToProducts(true);
    }
    if(goToProducts) {
        router.push('/products');
    }
    return (
            <form onSubmit={saveProduct}>
            
            <label>Product Name</label>
            <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
            <label>Price (in &#8377;)</label>
            <input type="number" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)}/>
            <button type="submit" className="btn-primary">Save</button>
            </form>
    );
}