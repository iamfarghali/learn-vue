var eventBus = new Vue()

Vue.component('product-tabs', {
	props:{
		reviews: {
			type:Array,
			required:true
		}
	},
	template: `
		<div>
			<span class="tab"
				  :class="{activeTab:selectedTab === tab}"
				  v-for="(tab, index) in tabs"
				  :key="index"
				  @click="selectedTab = tab">
				{{tab}}
			</span>


	        <div v-show="selectedTab === 'Reviews'">
		        <h2>Reviews</h2>
		        <p v-if="!reviews.length">There are no reviews yet.</p>
		        <ul>
		          <li v-for="review in reviews">
		          <p>{{ review.name }}</p>
		          <p>Rating: {{ review.rating }}</p>
		          <p>{{ review.review }}</p>
		          </li>
		        </ul>
	        </div>

			<product-review v-show="selectedTab === 'Make a Review'"></product-review>
		</div>
	`,
	data: function () {
		return {
			tabs: ['Reviews', 'Make a Review'],
			selectedTab: 'Reviews'
		}
	} 
})

Vue.component('product-review', {
	template:`
		<form class="review-form" @submit.prevent="onSubmit">
			<div v-if="errors.length">
				<b>Please correct the following error(s):</b>
		      	<ul>
		        	<li v-for="error in errors">{{ error }}</li>
		      	</ul>
			</div>

			<p>
		        <label for="name">Name:</label>
		        <input id="name" v-model="name" placeholder="name">
		    </p>

		    <p>
				<label for="review">Review:</label>
				<textarea id="review" v-model="review"></textarea>
		    </p>

            <p>			
		        <label for="rating">Rating:</label>
		        <select id="rating" v-model.number="rating">
		          <option>5</option>
		          <option>4</option>
		          <option>3</option>
		          <option>2</option>
		          <option>1</option>
		        </select>
		    </p>

		    <p>
		    	<input type="submit" value="Submit">  
		    </p>    
		    
		</form>
	`,
	data: function() {
		return {
			name:null,
			review:null,
			rating:null,
			errors:[]
		}
	},
	methods: {
		onSubmit: function() {
			this.errors = []
			if (this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating
				}
				eventBus.$emit('review-submitted', productReview)
				this.name = null
				this.review = null
				this.rating = null
			} else {
				if (!this.name) this.errors.push('Name Required')
				if (!this.review) this.errors.push('Review Required')
				if (!this.rating) this.errors.push('Rating Required')
			}
		}
	}
})

Vue.component('product', {
	props:{
		premium:{
			type:Boolean,
			required:true
		}
	},
	'template': `
		<div class="product">
			<div class="product-image">
			<img :src="image" alt="iamge">
			</div>

			<div class="product-info">
	    		<h1>{{title}}</h1>
	    		<p v-show="inStock">In Stock</p>
	    		<p>{{shipping}}</p>
				<ul>
					<li v-for="detail in details">{{detail}}</li>
				</ul>

				<div v-for="(variant, index) in variants" 
					 :key="variant.id"
					 class="color-box"
					 :style="{backgroundColor:variant.color}"
					 @mouseover="updateProduct(index)">
				</div>

				<button @click="addToCart"
						:disabled="!inStock"
						:class="{disabledButton: !inStock}">
					Add to Cart
				</button>
			</div>

			<product-tabs :reviews="reviews"></product-tabs>
		</div>`,
	data: function() {
		return {
			brand: 'VueMore',
			product:'Sockets',
			selectedVariant:0,
			details: ['100% Cotton', 'Free', 'JonDoe'],
			variants: [
				{
					id: 2222,
					color: 'Green',
					image: 'img/green.jpg',
					quantity: 10
				}, 
				{
					id: 2223,
					color: 'Blue',
					image: 'img/blue.jpg',
					quantity: 0
				}
			],
			reviews: []
		}
	},
	methods: {
		addToCart: function() {
			this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
		},
		updateProduct: function(index) {
			this.selectedVariant = index
		}
	},
	computed: {
		title: function() {
			return this.brand + ' ' + this.product
		},
		image: function() {
			return this.variants[this.selectedVariant].image
		},
		inStock: function() {
			return this.variants[this.selectedVariant].quantity > 0
		},
		shipping: function() {
			if (this.premium) {
				return 'Free'
			}
			return '5.49'
		}
	},
	mounted() {
		eventBus.$on('review-submitted', function(review) {
			this.reviews.push(review)
		}.bind(this))
	}
});



var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		cart: []
	},
	methods: {
		updateCart: function(id) {
			this.cart.push(id)
		},
	}
});