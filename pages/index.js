import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import styles from '../styles/Home.module.css';

export default function Home() {
	const inputRef = useRef(null);
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const onSubmit = async () => {
		if (!!inputRef.current.value.trim().length) {
			setLoading(true);
			const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputRef.current.value}`);
			const data = await res.json();
			setMeals(() => data?.meals);
			setLoading(false);
		}
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Food Recipe App</title>
				<meta name='description' content='The best place to find and cook your favourite recipes.' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<header>
				<h1>Food Recipes</h1>
			</header>

			<main className={styles.main}>
				<div className={styles.search}>
					<input placeholder='Enter Item Name' type='text' ref={inputRef} />
					<button onClick={onSubmit} type='submit'>
						Search
					</button>
				</div>
				<div className={styles['search-results']}>
					{loading && (
						<h2 style={{ textAlign: 'center' }}>
							{' '}
							Hang on! <br /> Getting meals for {inputRef.current?.value}...{' '}
						</h2>
					)}
					{!!meals?.length && !loading ? (
						meals.map((meal) => (
							<RecipeCard
								key={meal.idMeal}
								img={meal.strMealThumb}
								actionText={'View More'}
								reciepe={meal.strMeal}
								type={`${meal.strCategory} , ${meal.strArea}`}
								onBtnClick={() => router.push(`/${meal.idMeal}`)}
							/>
						))
					) : !!inputRef.current?.value && !loading ? (
						<h2> No results </h2>
					) : (
						''
					)}
				</div>
			</main>
		</div>
	);
}
