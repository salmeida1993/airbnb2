async function getData() {
    const listings = 'airbnb_sf_listings_500.json';
    try {
        const response = await fetch(listings);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
    
        const container = document.getElementById('container');
        const template = document.getElementById('listing_template');

        data.slice(0,50).forEach(listing => {
            // Cloning the template content
            const base = template.content.cloneNode(true);

            base.querySelector('.title').textContent = listing.name;
            base.querySelector('.image').src = listing.picture_url;
            base.querySelector('.image').alt = `Thumbnail for ${listing.name}`;
            base.querySelector('.host').textContent = `Host: ${listing.host_name}`;
            base.querySelector('.host_image').src = listing.host_picture_url;
            base.querySelector('.host_image').alt = `Picture of host ${listing.host_name}`;
            base.querySelector('.price').textContent = `Price: ${listing.price}`;
            base.querySelector('.rating').textContent = `🌟${listing.review_scores_rating}`;
            // Utilizing innerHTML to preserve HTML formatting in the description
            base.querySelector('.description').innerHTML = listing.description;

            container.append(base);
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

getData();