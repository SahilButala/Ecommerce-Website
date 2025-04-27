import axiousInstance from "../api/axious/index.js";

// auth services
export async function RegisterUserService(formdata) {
  const { data } = await axiousInstance.post("/user/auth/register", {
    ...formdata,
  });
  return data;
}
export async function LoginUserService(formdata) {
  const { data } = await axiousInstance.post(
    "/user/auth/login",
    {
      ...formdata,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function logoutUserService() {
  const { data } = await axiousInstance.post(
    "/user/auth/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return data;
}
export async function ChangePasswordService(formdata) {
  const { data } = await axiousInstance.post(
    "/user/auth/change-pass",
    {
      ...formdata,
    },
    {
      withCredentials: true,
    }
  );
  return data;
}

// admin services
export async function handleImageUploadToCloudinaryService(formdata) {
  const { data } = await axiousInstance.post("/admin/image-upload", formdata);
  return data;
}
export async function getAllProductsService() {
  const { data } = await axiousInstance.get("/admin/get-products");
  return data;
}
export async function addProductToPageService(formdata) {
  const { data } = await axiousInstance.post(
    "/admin/add-product",
    {
      ...formdata,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}
export async function DeleteProductFromPageService(id) {
  const { data } = await axiousInstance.delete(`/admin/delete-product/${id}`);
  return data;
}
export async function editProductService(formdata, id) {
  const { data } = await axiousInstance.put(
    `/admin/edit-product/${id}`,
    {
      ...formdata,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
}

//user view services
export async function getProductDetailsByIdService(id) {
  const { data } = await axiousInstance.get(
    `/userview/get/product/details/${id}`
  );
  return data;
}
export async function fetchUserShopingProductsService({ filter, sortParams }) {
  const query = new URLSearchParams({
    ...filter,
    sortBy: sortParams,
  });
  const { data } = await axiousInstance.get(`/userview/get/products?${query}`);
  return data;
}

export async function addToCartService({ userId, productId, quantity }) {
  const { data } = await axiousInstance.post(`/userview/cart/add`, {
    userId,
    productId,
    quantity,
  });
  return data;
}
export async function fetchAllCartItemsService(userId) {
  const { data } = await axiousInstance.get(`/userview/cart/get/${userId}`);
  return data;
}
export async function DeleteCartItemService({ userId, productId }) {
  const { data } = await axiousInstance.delete(
    `/userview/cart/delete/${userId}/${productId}`
  );
  return data;
}
export async function updateCartItemQuantityService({
  userId,
  productId,
  quantity,
}) {
  const { data } = await axiousInstance.put(`/userview/cart/update`, {
    userId,
    productId,
    quantity,
  });
  return data;
}

export async function add_AddressService({
  city,
  address,
  pincode,
  phone,
  notes,
  userId,
}) {
  const { data } = await axiousInstance.post(`/checkout/user/add`, {
    city,
    address,
    pincode,
    phone,
    notes,
    userId,
  });
  return data;
}

export async function updateUserAddressService({
  formdata,
  userId,
  addressId,
}) {
  const { data } = await axiousInstance.put(
    `/checkout/user/update/${userId}/${addressId}`,
    {
      formdata,
    }
  );
  return data;
}
export async function fetchallAddressService({ userId }) {
  const { data } = await axiousInstance.get(`/checkout/user/get/${userId}`);
  return data;
}
export async function DeleteAddressService({ userId, addressId }) {
  const { data } = await axiousInstance.delete(
    `/checkout/user/delete/${userId}/${addressId}`
  );
  return data;
}

// paypal

export async function cretaeUserProductOrderService(formdata) {
  const { data } = await axiousInstance.post("/paypal/user/create", formdata);
  return data;
}
export async function captureUserProductOrderService({
  paymentId,
  payerId,
  orderId,
}) {
  const { data } = await axiousInstance.post("/paypal/user/capture", {
    paymentId,
    payerId,
    orderId,
  });
  return data;
}
export async function getallOrderByUserService({ userId }) {
  const { data } = await axiousInstance.get(`/paypal/user/get/${userId}`);

  return data;
}
export async function getOrderDetailsService(id) {
  const { data } = await axiousInstance.get(`/paypal/user/get/details/${id}`);

  return data;
}

// for admin get orders
export async function AdmingetOrderDetailsService(id) {
  const { data } = await axiousInstance.get(`/admin/orders/get/details/${id}`);

  return data;
}
export async function AdmingetallOrderByUserService() {
  const { data } = await axiousInstance.get(`/admin/orders/get`);

  return data;
}
export async function updateOrderStatusService({ id, orderStatus }) {
  const { data } = await axiousInstance.post(`/admin/orders/update/${id}`, {
    orderStatus,
  });

  return data;
}

export async function SearchProductsService(keyword) {
  const { data } = await axiousInstance.get(`/search/${keyword}`);

  return data;
}
export async function addReviewService({
  userId,
  text,
  productId,
  userName,
  reviewValue,
}) {
  const { data } = await axiousInstance.post(`/user/review/add`, {
    userId,
    text,
    productId,
    userName,
    reviewValue,
  });

  return data;
}
export async function getAllReviewsService(productId) {
  const { data } = await axiousInstance.get(`/user/review/get/${productId}`);

  return data;
}
export async function getFeatureImageService() {
  const { data } = await axiousInstance.get(`/admin/feature/get`);

  return data;
}
export async function addFeatureImageService({image}) {
  const { data } = await axiousInstance.post(`/admin/feature/add/`,{image});

  return data;
}


