import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import ProductModal from './ProductModal'
import styles from './productList.module.scss'

const ProductList = ({ onAddToCart, searchQuery }) => {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [activeFilter, setActiveFilter] = useState('все')
	const [selectedProduct, setSelectedProduct] = useState(null)
	const [showProductModal, setShowProductModal] = useState(false)

	const filters = ['все', 'супы', 'горячее', 'закуски', 'напитки']

	useEffect(() => {
		fetchProducts()
	}, [])

	// Фильтрация продуктов по поисковому запросу и категории
	useEffect(() => {
		let result = products

		// Применяем поиск
		if (searchQuery) {
			result = result.filter(product =>
				product.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		// Применяем фильтр по категории
		if (activeFilter !== 'все') {
			result = result.filter(product => product.category === activeFilter)
		}

		setFilteredProducts(result)
	}, [products, searchQuery, activeFilter])

	const fetchProducts = async () => {
		    const mockProducts = [
      {
        id: 1,
        name: 'Том Ям',
        price: 290,
        category: 'супы',
        thumbnail:
          'https://s3.smartofood.ru/kitaika_kaluga_ru/menu/241d6f0a-39b0-5124-af80-ff153767f6e1.png',
        description:
          'Острый и ароматный тайский суп с креветками, грибами и кокосовым молоком. Подается с рисом.',
        ingredients: [
          'креветки',
          'шампиньоны',
          'кокосовое молоко',
          'лемонграсс',
          'лайм',
          'чили',
        ],
        weight: '350г',
        cookingTime: '15-20 мин',
      },
      {
        id: 2,
        name: 'Пад Тай',
        price: 320,
        category: 'горячее',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3FrDUjq-BhQ4crtEACbwtI23laESYrEQsLA&s',
        description:
          'Традиционная тайская лапша с креветками, тофу, яйцом и арахисом.',
        ingredients: [
          'рисовая лапша',
          'креветки',
          'тофу',
          'яйцо',
          'ростки бобов',
          'арахис',
        ],
        weight: '300г',
        cookingTime: '12-15 мин',
      },
      {
        id: 3,
        name: 'Том Кха',
        price: 310,
        category: 'супы',
        thumbnail:
          'data:image/jpeg;base64,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',
        description:
          'Кремовый суп с курицей и кокосовым молоком, с яркими нотами лемонграсса и лайма.',
        ingredients: [
          'куриное филе',
          'кокосовое молоко',
          'шампиньоны',
          'лемонграсс',
          'лайм',
          'чили',
        ],
        weight: '350г',
        cookingTime: '15-20 мин',
      },
      {
        id: 4,
        name: 'Зеленое карри',
        price: 350,
        category: 'горячее',
        thumbnail:
          'https://kotanyi-ru.imgix.net/wp-content/uploads/2024/10/Green-Curry_website.jpg?auto=format,compress',
        description:
          'Ароматное карри с курицей и овощами в кокосовом молоке с зеленой пастой карри.',
        ingredients: [
          'куриное филе',
          'кокосовое молоко',
          'баклажан',
          'базилик',
          'зеленая паста карри',
        ],
        weight: '320г',
        cookingTime: '20-25 мин',
      },
      {
        id: 5,
        name: 'Спринг Роллы',
        price: 280,
        category: 'закуски',
        thumbnail:
          'https://img.iamcook.ru/2023/upl/recipes/cat/u-6630ade7f00813b5eba6e176d9d93af8.jpg',
        description:
          'Хрустящие рисовые роллы с овощами и стеклянной лапшой. Подаются с соусом.',
        ingredients: [
          'рисовые блинчики',
          'морковь',
          'огурец',
          'салат',
          'стеклянная лапша',
          'мята',
        ],
        weight: '200г (4 шт)',
        cookingTime: '8-10 мин',
      },
      {
        id: 6,
        name: 'Тайский чай',
        price: 180,
        category: 'напитки',
        thumbnail:
          'https://media.istockphoto.com/id/2147495755/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%82%D0%B0%D0%B9%D1%81%D0%BA%D0%B8%D0%B9-%D1%87%D0%B0%D0%B9%D0%BD%D1%8B%D0%B9-%D0%BD%D0%B0%D0%BF%D0%B8%D1%82%D0%BE%D0%BA.jpg?s=612x612&w=0&k=20&c=g2WeMGcYEU4rVyolRf4JJpfKLB6qgn0TIY7PeGGuiAo=',
        description:
          'Традиционный тайский чай с молоком и специями. Освежающий и бодрящий напиток.',
        ingredients: ['тайский чай', 'сгущенное молоко', 'специи', 'лед'],
        volume: '400мл',
      },
      {
        id: 7,
        name: 'Пепперони',
        price: 450,
        category: 'пицца',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGPNKi1810nFv3iWzh80guAWBavXUXgXlRmQ&s',
        description: 'Классическая пицца с острыми колбасками пепперони и расплавленным сыром моцарелла.',
        ingredients: [
          'тесто для пиццы',
          'соус томатный',
          'сыр моцарелла',
          'пепперони',
          'специи',
        ],
        weight: '550г (30см)',
        cookingTime: '12-15 мин',
      },
      {
        id: 8,
        name: 'Чизбургер',
        price: 320,
        category: 'бургеры',
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVI8wfW3qpKI_zDBNJLEx0Nwh49DJlv3dVg&s',
        description: 'Сочная котла из говядины с сыром Чеддер, свежими овощами и фирменным соусом.',
        ingredients: [
          'булка бриошь',
          'говяжья котла',
          'сыр Чеддер',
          'помидор',
          'салат айсберг',
          'красный лук',
          'фирменный соус',
        ],
        weight: '350г',
        cookingTime: '10 мин',
      },
      {
        id: 9,

        name: 'Цезарь с курицей',
        price: 380,
        category: 'салаты',
        thumbnail: 'https://images.gastronom.ru/LoVJjeEYXJQ3vR2Yn8WtlivB0eZ78Rtu417zEnX1mZs/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2IxMzU5MzRkLWI1OTAtNDQ4Zi05MjA3LWQ5YzEzM2M2ODZlNy5qcGc.webp',
        description: 'Знаменитый салат с хрустящими гренками, нежным цыпленком и соусом Цезарь.',
        ingredients: [
          'салат романо',
          'куриное филе-гриль',
          'гренки',
          'сыр Пармезан',
          'соус Цезарь',
        ],
        weight: '280г',
        cookingTime: '7 мин',
      },
      {
        id: 10,
        name: 'Кола',
        price: 150,
        category: 'напитки',
        thumbnail: 'https://www.waterbaikal.ru/image/cache/catalog/soki-napitki/limonad/coca-cola/coca-cola-033-poland-768x576.jpeg',
        description: 'Освежающий газированный напиток.',
        ingredients: [
          'кола',
          'лед',
        ],
        volume: '500мл',
      },
      {
        id: 11,
        name: 'Маргарита',
        price: 420,
        category: 'пицца',
        thumbnail: 'https://cdn.vkuso.ru/uploads/116430_domashnyaya-picca-margarita-s-mocarelloj-i-parmezanom_1649094920.jpg',
        description: 'Итальянская классика с томатным соусом, моцареллой и свежим базиликом.',
        ingredients: [
          'тесто для пиццы',
          'соус томатный',
          'сыр моцарелла',
          'помидоры',
          'базилик свежий',
        ],
        weight: '520г (30см)',
        cookingTime: '10-12 мин',
      },
      {
        id: 12,
        name: 'Картофель Фри',
        price: 180,
        category: 'закуски',
        thumbnail: 'https://cdn-ru6.foodpicasso.com/assets/2024/11/18/dbd03e3266651a98c80ad87602327d02---jpg_1000x_103c0_convert.jpg',
        description: 'Золотистый и хрустящий картофель с щепоткой морской соли.',
        ingredients: [
          'картофель',
          'масло растительное',
          'соль',
        ],
        weight: '150г',
        cookingTime: '8 мин',
      }
      
    ]
	setLoading(false)
	setProducts(mockProducts)
	setFilteredProducts(mockProducts)
		
	}

	const handleProductClick = product => {
		setSelectedProduct(product)
		setShowProductModal(true)
	}

	const handleAddToCartFromModal = (product, quantity) => {
		onAddToCart(product, quantity)
		setShowProductModal(false)
	}

	if (loading) return <div className={styles.loading}>Загрузка товаров...</div>
	if (error) return <div className={styles.error}>Ошибка: {error}</div>

	return (
		<div className={styles.container}>
			<ProductFilter
				filters={filters}
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
			/>

			{filteredProducts.length === 0 ? (
				<div className={styles.noProducts}>
					<h3>Товары не найдены</h3>
					<p>
						Попробуйте изменить поисковый запрос или выбрать другую категорию
					</p>
				</div>
			) : (
				<div className={styles.productsGrid}>
					{filteredProducts.map(product => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={onAddToCart}
							onProductClick={handleProductClick}
						/>
					))}
				</div>
			)}

			{showProductModal && selectedProduct && (
				<ProductModal
					product={selectedProduct}
					onClose={() => setShowProductModal(false)}
					onAddToCart={handleAddToCartFromModal}
				/>
			)}
		</div>
	)
}

export default ProductList
