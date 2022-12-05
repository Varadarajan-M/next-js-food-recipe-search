import Link from 'next/link';
import React from 'react';
import Card from './Card';

function RecipeCard(props) {
	return (
		<Card>
			<picture className='recipecard-img'>
				<source srcSet={props.img} type='image/webp' />
				<img src={props.img} alt={props.alt} />
			</picture>

			<div className='recipecard-text-part'>
				<div className='recipecard-body'>
					<p>{props.reciepe}</p>
					<p>{props.type}</p>
				</div>

				<div className='recipecard-footer'>
					<Link href={props.linkTo}>
						<button>{props.actionText}</button>
					</Link>
				</div>
			</div>
		</Card>
	);
}

export default RecipeCard;
