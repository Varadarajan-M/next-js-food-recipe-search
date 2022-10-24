import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/MealDetails.module.css';

const MealDetail = ({ meal }) => {
	const router = useRouter();
	const urlPart = 'https://www.youtube.com/embed/';
	const embedPart = meal?.strYoutube ?? '';
	const videoId = embedPart.slice(embedPart.indexOf('=') + 1, embedPart.length);
	const finalUrl = urlPart + videoId;

	if (!!Object.keys(meal ?? {}).length) {
		const ingredients = Object.entries(meal)
			.map(([k, v]) => k.toString().includes('strIngredient') && !!v.trim().length && v)
			.filter(Boolean);
		return (
			<>
				<Head>
					<title>{meal?.strMeal}</title>
					<meta name='description' content={meal?.strInstructions} />
					<link rel='icon' href={meal?.strMealThumb} />
				</Head>

				<main className={styles.container}>
					<div className={styles.wrapper}>
						<h4>Search Results...</h4>
						<span onClick={() => router.push('/')} role='button'>
							Go back{' '}
						</span>
						<div className={styles.top}>
							<div className={styles.topMealImg}>
								<p>{meal?.strMeal}</p>
								<picture className={styles.img}>
									<source srcSet={meal?.strMealThumb} type='image/webp' />
									<img src={meal?.strMealThumb} alt={''} />
								</picture>
								<p>{meal?.strArea}</p>
							</div>
							<div className={styles.howTo}>
								<p>Ingredients</p>
								<div className={styles.ingredients}>
									{ingredients.map((i, idx) => (
										<span key={idx}>{i}</span>
									))}
								</div>
								<div className={styles.ytContainer}>
									<iframe
										style={{ float: 'left' }}
										width='560'
										height='315'
										src={finalUrl}
										title='YouTube video player'
										frameBorder='0'
										allowFullScreen
									/>
								</div>
							</div>
						</div>

						<div className={styles.bottom}>
							<h4>Instructions</h4>
							<span>{meal?.strInstructions}</span>
						</div>
					</div>
				</main>
			</>
		);
	} else {
		setTimeout(() => router.push('/'), 3000);
		return <h4 style={{ textAlign: 'center' }}>No meal found Redirecting...</h4>;
	}
};

export const getStaticProps = async (context) => {
	const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${context.params.id}`);
	const data = await res.json();

	return {
		props: { meal: data?.meals?.length > 0 ? data?.meals[0] : {} },
		revalidate: 1,
	};
};

export const getStaticPaths = () => {
	return { paths: [], fallback: 'blocking' };
};

export default MealDetail;
