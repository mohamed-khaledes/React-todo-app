import { useEffect, useState } from "react";

const CategoryBtnHook = (val, selectedCategory) => {
  const [activeCategory, setActiveCategory] = useState(false);
  
  
  useEffect(()=>{
   const isSelected =  selectedCategory.some((v)=>(
      v.category === val.category 
    ))
    setActiveCategory(isSelected)
  },[selectedCategory,val.category])

  return {activeCategory}
}

export default CategoryBtnHook
