import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import ProductItem from "../../components/ProductItem/ProductItem";
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from "react";
import TypeFilter from "./TypeFilter/TypeFilter";
import PriceFilter from "./PriceFilter/PriceFilter";
import ColorFilter from "./ColorFilter/ColorFilter";
import SizeFilter from "./SizeFilter/SizeFilter";
import SortFilter from "./SortFilter/SortFilter";
import { Box, Button, Modal, TextField, Typography, InputLabel, MenuItem, FormControl, Select, PaginationItem } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';

import './ShopPage.scss';
import { changeLoading } from "../../redux/slices/appSlice";
import { URL } from "../../api/api";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const requestFetch = (url) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    }

    return response.json().then(error => {
      const e = new Error('Smth gone wrong')
      e.data = error
      throw e
    })
  });
}


function ShopPage() {
  const { isAdmin, allColors, allCategories, token } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const [toList, setToList] = useState(false)

  const [color, setColor] = useState('');
  const [size, setSize] = useState([]);
  const [category, setCategory] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [price, setPrice] = useState('');
  const [selectedGender, setSelectedGender] = useState('')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setColor('');
    setSize([])
    setCategory('')
    setPhotoPath('')
    setTitle('')
    setDescr('')
    setPrice('')
    setSelectedGender('')
  };

  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [searchParams, setSearchParams] = useSearchParams()
  const gender = searchParams.get('gender');

  const [productsData, setProductsData] = useState([]);
  const [cloneProducts, setCloneProducts] = useState([]);
  const [filteredCloneData, setFilteredCloneData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      setCloneProducts([...filteredCloneData.slice(currentPage - 1, currentPage + 5)])
    } else {
      setCloneProducts([...filteredCloneData.slice((currentPage - 1) * 6, currentPage * 6)])
    }
  }, [filteredCloneData, currentPage])

  useEffect(() => {
    setFilteredCloneData([...productsData])

    const allPrices = []
    productsData.forEach(product => {
      allPrices.push(product.price)
    });

    setMinPrice(Number.isFinite(Math.min(...allPrices)) ? Math.min(...allPrices) : 0)
    setMaxPrice(Number.isFinite(Math.max(...allPrices)) ? Math.max(...allPrices) : 1)
  }, [productsData])

  useEffect(() => {
    setCategoryFilter()
    dispatch(changeLoading(true))
    const url = `${URL}/product/for/${gender === 'man' ? 'm' : 'w'}`;

    requestFetch(url)
      .then(data => {
        dispatch(changeLoading(false))
        // console.log(data)
        setProductsData(data)
      })
      .catch(err => {
        dispatch(changeLoading(false))
        console.log(err);
      });
  }, [gender, rerender])

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = {
      colorId: color,
      categoryId: category,
      title: title,
      price: +price,
      size: size.join(','),
      img: photoPath,
      description: descr,
      gender: selectedGender
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token,
    }

    await fetch(`${URL}/product/`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      handleClose()
      return response.json()
    });

    setRerender(prev => !prev)
  }

  const uploadImage = async (files) => {
    dispatch(changeLoading(true))
    const formData = new FormData();
    formData.append("file", files[0])
    formData.append("upload_preset", "qf1acott")

    await Axios.post('https://api.cloudinary.com/v1_1/malbo/image/upload', formData)
      .then(response => {
        setPhotoPath(response.data.url);
        dispatch(changeLoading(false))
      })
  }

  const [categoryFilter, setCategoryFilter] = useState()
  useEffect(() => {
    if (categoryFilter !== undefined) {
      setFilteredCloneData(productsData.filter((item) => item.categoryId === categoryFilter))
    } else {
      setFilteredCloneData([...productsData])
    }
  }, [categoryFilter])

  const [colorFilter, setColorFilter] = useState()
  useEffect(() => {
    if (colorFilter === undefined) {
      setFilteredCloneData([...productsData])
    } else {
      setFilteredCloneData(productsData.filter((item) => item.colorId === colorFilter))
    }
  }, [colorFilter])

  const [sizeFilter, setSizeFilter] = useState([])
  useEffect(() => {
    const filteredProduct = []
    const filteredProductIds = [...productsData]

    sizeFilter.forEach(size => {
      
      productsData.forEach((product, index) => {
        if (product.size.includes(size) && !filteredProductIds.includes(product.id)) {
          filteredProduct.push(product)
          filteredProductIds.push(product.id)
        }
      });
    });

    if (filteredProduct.length) {
      setFilteredCloneData(filteredProduct)
    } else {
      setFilteredCloneData([...productsData])
    }
  }, [sizeFilter])

  const [maxPrice, setMaxPrice] = useState(100)
  const [minPrice, setMinPrice] = useState(0)
  const [priceFilter, setPriceFilter] = useState()
  useEffect(() => {
    const filteredProduct = []
    productsData.forEach(product => {
      if (product.price >= priceFilter[0] && product.price <= priceFilter[1]) {
        filteredProduct.push(product)
      }
    });

    if (filteredProduct.length) {
      setFilteredCloneData(filteredProduct)
    } else {
      setFilteredCloneData([...productsData])
    }
  }, [priceFilter])

  const [sortFilter, setSortFilter] = useState(null)
  useEffect(() => {
    if (sortFilter !== null) {
      if (sortFilter === 0) {
        setProductsData([...filteredCloneData.sort((a, b) => a.price - b.price)])
      } else {
        setProductsData([...filteredCloneData.sort((a, b) => b.price - a.price)])
      }
    } else {
      setFilteredCloneData([...productsData])
    }
  }, [sortFilter])

  return (
    <div className="ShopPage">
      <Breadcrumbs title={'catalog'} />

      <section className="shop">
        <div className="container">
          <TypeFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />

          <div className="shop__inner">
            <div className="shop__filters filter">
              <PriceFilter setPriceFilter={setPriceFilter} maxPrice={maxPrice} minPrice={minPrice} />
              <ColorFilter setColorFilter={setColorFilter} />
              <SizeFilter sizeFilter={sizeFilter} setSizeFilter={setSizeFilter} />
            </div>

            <div className="shop-content">
              <div className="shop-content__filter">
                <div className="shop-content__filter-buttons">
                  <span>View</span>
                  <button
                    className={`shop-content__filter-btn button-grid  ${!toList && 'shop-content__filter-btn--active'}`}
                    onClick={() => { setToList(false) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15px"
                      height="15px">
                      <path fill-rule="evenodd" fill="rgb(141, 141, 141)"
                        d="M-0.000,3.750 L3.750,3.750 L3.750,-0.000 L-0.000,-0.000 L-0.000,3.750 ZM5.625,15.000 L9.375,15.000 L9.375,11.250 L5.625,11.250 L5.625,15.000 ZM-0.000,15.000 L3.750,15.000 L3.750,11.250 L-0.000,11.250 L-0.000,15.000 ZM-0.000,9.375 L3.750,9.375 L3.750,5.625 L-0.000,5.625 L-0.000,9.375 ZM5.625,9.375 L9.375,9.375 L9.375,5.625 L5.625,5.625 L5.625,9.375 ZM11.250,-0.000 L11.250,3.750 L15.000,3.750 L15.000,-0.000 L11.250,-0.000 ZM5.625,3.750 L9.375,3.750 L9.375,-0.000 L5.625,-0.000 L5.625,3.750 ZM11.250,9.375 L15.000,9.375 L15.000,5.625 L11.250,5.625 L11.250,9.375 ZM11.250,15.000 L15.000,15.000 L15.000,11.250 L11.250,11.250 L11.250,15.000 Z" />
                    </svg>
                  </button>
                  <button
                    className={`shop-content__filter-btn button-list ${toList && 'shop-content__filter-btn--active'}`}
                    onClick={() => { setToList(true) }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px"
                      height="15px">
                      <path fill-rule="evenodd" fill="rgb(141, 141, 141)"
                        d="M5.835,14.998 L5.835,10.827 L19.994,10.827 L19.994,14.998 L5.835,14.998 ZM5.835,5.413 L19.994,5.413 L19.994,9.585 L5.835,9.585 L5.835,5.413 ZM5.835,0.000 L19.994,0.000 L19.994,4.172 L5.835,4.172 L5.835,0.000 ZM0.007,10.827 L4.429,10.827 L4.429,14.998 L0.007,14.998 L0.007,10.827 ZM0.007,5.413 L4.429,5.413 L4.429,9.585 L0.007,9.585 L0.007,5.413 ZM0.007,0.000 L4.429,0.000 L4.429,4.172 L0.007,4.172 L0.007,0.000 Z" />
                    </svg>
                  </button>
                </div>

                {isAdmin && <Button variant="contained" onClick={handleOpen}>Add new</Button>}
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Add new product
                    </Typography>
                    <form className="add-form" onSubmit={onSubmit}>
                      <TextField
                        required
                        fullWidth
                        label="Title"
                        variant="outlined"
                        onChange={(e) => { setTitle(e.target.value) }}
                      />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40, }}>
                        <Button
                          variant="outlined"
                          component="label"
                          style={{ height: '100%', }}
                        >
                          Upload Photo
                          <input
                            required
                            type="file"
                            accept="image/png, image/jpg, image/gif, image/jpeg"
                            onChange={(e) => { uploadImage(e.target.files) }}
                            style={{ display: 'none' }}
                          />
                        </Button>
                        <input
                          readonly
                          // disabled
                          required
                          placeholder="Select some image"
                          title={photoPath}
                          style={{
                            maxWidth: 170,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            height: '100%',
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                            borderRadius: 5,
                            padding: '0 10px',
                            outline: 'none'
                          }}
                          value={photoPath}
                        />
                      </div>
                      <TextField
                        required
                        fullWidth
                        label="Description"
                        variant="outlined"
                        onChange={(e) => { setDescr(e.target.value) }}
                      />
                      <TextField
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        required
                        fullWidth
                        label="Price"
                        variant="outlined"
                        onChange={(e) => { setPrice(e.target.value) }}
                      />
                      <FormControl sx={{ m: 1, width: '100%', margin: 0 }} required>
                        <InputLabel id="select-color">Color</InputLabel>
                        <Select
                          labelId="select-color"
                          id="select-color"
                          value={color}
                          label="Color"
                          onChange={handleChangeColor}
                          MenuProps={
                            {
                              PaperProps: {
                                style: {
                                  maxHeight: 200,
                                  width: 200,
                                },
                              },
                            }
                          }
                        >
                          {allColors?.map(item => (
                            <MenuItem value={item.id}>
                              <div className='option' style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='colorRect' style={{ background: item.hex }} />{item.name}
                              </div>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth required>
                        <InputLabel id="select-size">Size</InputLabel>
                        <Select
                          multiple
                          labelId="select-size"
                          id="select-size"
                          value={size}
                          label="Size"
                          onChange={handleChangeSize}
                        >
                          <MenuItem value={'Xs'}>Xs</MenuItem>
                          <MenuItem value={'S'}>S</MenuItem>
                          <MenuItem value={'M'}>M</MenuItem>
                          <MenuItem value={'L'}>L</MenuItem>
                          <MenuItem value={'XL'}>XL</MenuItem>
                          <MenuItem value={'XXL'}>XXL</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth required>
                        <InputLabel id="select-gender" >Gender</InputLabel>
                        <Select
                          labelId="select-gender"
                          id="select-gender"
                          value={selectedGender}
                          label="Gender"
                          onChange={(e) => setSelectedGender(e.target.value)}
                        >
                          <MenuItem value={'m'}>Man</MenuItem>
                          <MenuItem value={'w'}>Woman</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth required>
                        <InputLabel id="select-category" >Category</InputLabel>
                        <Select
                          labelId="select-category"
                          id="select-category"
                          value={category}
                          label="Category"
                          onChange={handleChangeCategory}
                        >
                          {allCategories.map(item => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Button variant="contained" type='submit'>Add new</Button>
                    </form>
                  </Box>
                </Modal>

                <SortFilter setSortFilter={setSortFilter} />

              </div>
              <div className="shop-content__inner" >
                {cloneProducts.map(item => (
                  <ProductItem
                    category={allCategories.find(category => category.id === item.categoryId)}
                    colorObj={allColors.find(color => color.id === item.colorId)}
                    toList={toList}
                    img={item.img}
                    price={item.price}
                    title={item.title}
                    descr={item.description}
                    id={item.id} />
                ))}
              </div>

              <div className="pagination">
                <Pagination
                  count={filteredCloneData.length ? Math.ceil(filteredCloneData.length / 6) : 1}
                  onChange={(e, page) => setCurrentPage(page)}
                />
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShopPage;