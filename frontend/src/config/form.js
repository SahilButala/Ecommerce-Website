export const registerFormControl = [
  {
    name: "userName",
    placeholder: "Enter your first  name",
    label: "UserName",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter your first  Email",
    label: "Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Enter your first  password",
    label: "password",
    componentType: "input",
    type: "password",
  },
];

export const registerInitialFormData = {
  userName: "",
  email: "",
  password: "",
};

export const SignInitialFormData = {
  email: "",
  password: "",
};

export const SignFormControl = [
  {
    name: "email",
    placeholder: "Enter your first  Email",
    label: "Email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Enter your first  password",
    label: "password",
    componentType: "input",
    type: "password",
  },
];

export const ChangePassInitialData = {
  email: "",
  oldpassword: "",
  newpassword: "",
  ReEnterPass: "",
};

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "saleprice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const  CreateProdcutInitialFormData = {
          image : null,
          title : '',
          description : '',
          category : '',
          brand : '',
          price : null,
          saleprice : null,
          totalStock : null
}
export const headerNavLinks = [
  {
    id : 'home',
    name : 'home',
    path : '/shop/home'
  },
  {
    id : 'products',
    name : 'products',
    path : '/shop/products'
  },
  {
    id : 'chekout',
    name : 'chekout',
    path : '/shop/checkout'
  },
  {
    id : 'account',
    name : 'account',
    path : '/shop/account'
  },
  {
    id : 'search',
    name : 'search',
    path : '/shop/search'
  },
]
export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};
export const SortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];
// user view data
export const Productdata = [
  {
    description : "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    title : "Basic Tee 8-Pack",
    price : 365,
    image : 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg'
  },
  {
    description : "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    title : "Basic Tee 8-Pack",
    price : 365,
    image : 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg'
  },
  {
    description : "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    title : "Basic Tee 8-Pack",
    price : 365,
    image : 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg'
  },
  {
    description : "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    title : "Basic Tee 8-Pack",
    price : 365,
    image : 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg'
  },
  {
    description : "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
    title : "Basic Tee 8-Pack",
    price : 365,
    image : 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-01.jpg'
  },
]

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

// UserOrderDetails