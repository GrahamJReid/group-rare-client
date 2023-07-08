import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import CategoryCard from '../components/categories/CatCard';
import { getCategories } from '../utils/data/categoriesData';

function AllCategories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const getAllCategories = () => {
    getCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  console.warn(categories);
  return (
    <>
      <div>
        <div>
          <Button
            onClick={() => {
              router.push('/categories/new');
            }}
            style={{ marginTop: '50px', marginBottom: '50px', backgroundColor: '#003049' }}
          >
            New Category
          </Button>
        </div>
      </div>
      <h1 style={{ marginBottom: '50px' }}>Categories</h1>
      {categories.map((category) => (
        <CategoryCard id={category.id} label={category.label} onUpdate={getCategories} />
      ))}
    </>
  );
}

export default AllCategories;
