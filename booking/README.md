# Welcome to EPITECH Barcelona Summer Camp

## 📋 Overview
What a pick! You got the booking theme!

We probably all have already booked things in our life, well what if we told you that this time YOU will create your own comprehensive hotel booking system! Well, for that we created this simple booking skeleton designed for you to not get started from scratch. It demonstrates key concepts in booking platforms including search functionality, reservation management, and user interface design using HTML, CSS, and JavaScript.

## 🎯 Learning Objectives
Through this you will learn:
- Booking system architecture and workflow
- Form handling and validation
- Date manipulation and calculations
- Modal dialogs and user interactions
- Search and filtering functionality
- Responsive design for travel websites
- Data management for reservations

## 📁 Project Structure
```
booking/
    ├── index.html          # Main HTML structure
    ├── style.css           # Styling and responsive design
    ├── script.js           # JavaScript functionality
    ├── data.json           # Hotels and booking data
    └── README.md           # This documentation
```

## 🚀 Features
- **Hotel Search**: Search hotels by destination with date selection
- **Booking System**: Complete reservation process with form validation
- **Booking Management**: View and manage existing reservations
- **Hotel Showcase**: Display featured hotels with detailed information
- **Responsive Design**: Mobile-friendly interface
- **Modal Dialogs**: Interactive booking forms

## 🔧 How It Works

### HTML Structure
- **Header**: Navigation and branding
- **Search Section**: Hotel search form and results
- **Bookings Section**: User reservation management
- **Hotels Section**: Featured hotels showcase
- **Modal**: Booking form overlay

### CSS Features
- **Grid Layouts**: Hotel cards and responsive grids
- **Gradient Backgrounds**: Modern visual design
- **Modal Styling**: Overlay dialogs
- **Form Styling**: Professional form appearance
- **Card Components**: Hotel and booking cards

### JavaScript Functionality
But first what's Javascript?

JavaScript is a programming language that adds interactivity and dynamic behavior to websites. It's kind like the brain and nervous system of our website! It's how web pages come alive, allowing for things like animations, form validation, and interactive elements that respond to user actions without needing to reload the page. 

Our code holds:
- **Search Logic**: Filter hotels by destination
- **Booking Process**: Complete reservation workflow
- **Date Validation**: Ensure valid check-in/out dates
- **Price Calculation**: Dynamic pricing based on nights
- **CRUD Operations**: Create, read, update, delete bookings

### JSON Data Structure
What about JSON Data?

Well JSON, which stands for JavaScript Object Notation, is a way to organize and store data in a text format. It's like a structured list of information, where each piece of information has a name (key) and a corresponding value. JSON is commonly used to exchange data between a server and a web application, making it easy for different parts of a system to understand and use the same information.

In our case this is the structure of our JSON:
```json
{
  "hotels": [
    {
      "id": 1,
      "name": "Hotel Name",
      "location": "City, State",
      "rating": 5,
      "pricePerNight": 299,
      "image": "image-url",
      "amenities": ["WiFi", "Pool", "Gym"],
      "description": "Hotel description"
    }
  ],
  "bookings": [
    {
      "id": 1,
      "hotelId": 1,
      "guestName": "Guest Name",
      "checkIn": "2024-02-15",
      "checkOut": "2024-02-18",
      "totalPrice": 897,
      "status": "confirmed"
    }
  ]
}
```

## 🛠️ CRUD Operations

### Create Booking
```javascript
function submitBooking(e, hotelId) {
    const newBooking = {
        id: bookings.length + 1,
        hotelId: hotelId,
        guestName: guestName,
        checkIn: checkIn,
        checkOut: checkOut,
        totalPrice: totalPrice,
        status: 'confirmed',
        bookingDate: new Date().toISOString()
    };
    bookings.push(newBooking);
    displayBookings();
}
```

### Read Bookings
```javascript
function displayBookings() {
    const bookingsList = document.getElementById('bookings-list');
    bookings.forEach(booking => {
        const bookingCard = createBookingCard(booking);
        bookingsList.appendChild(bookingCard);
    });
}
```

### Update Booking
```javascript
function modifyBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    // Open modal with existing booking data for editing
    // Update booking object with new data
}
```

### Delete Booking
```javascript
function cancelBooking(bookingId) {
    bookings = bookings.filter(booking => booking.id !== bookingId);
    displayBookings();
}
```

## 📚 Key Concepts Explained

### 1. Date Handling
```javascript
// Set minimum dates
const today = new Date().toISOString().split('T')[0];
document.getElementById('check-in').min = today;

// Calculate nights between dates
const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);
const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
```

### 2. Modal Dialog Management
```javascript
function openBookingModal(hotelId) {
    const modal = document.getElementById('booking-modal');
    modal.style.display = 'block';
    // Populate modal content
}

function closeBookingModal() {
    document.getElementById('booking-modal').style.display = 'none';
}
```

### 3. Search and Filter
```javascript
function handleSearch(e) {
    const destination = document.getElementById('destination').value;
    searchResults = hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(destination.toLowerCase())
    );
    displaySearchResults(searchResults);
}
```

### 4. Dynamic Price Calculation
```javascript
function updatePrice() {
    const nights = calculateNights(checkIn, checkOut);
    const totalPrice = hotel.pricePerNight * nights;
    updatePriceDisplay(totalPrice);
}
```

## 🎨 Customization Ideas
1. **Advanced Search**: Add filters for price, rating, amenities
2. **Payment Integration**: Add payment processing simulation
3. **User Accounts**: Add user registration and login
4. **Reviews System**: Add hotel reviews and ratings
5. **Map Integration**: Show hotel locations on a map
6. **Email Confirmations**: Send booking confirmations
7. **Multi-language**: Add internationalization support
8. **Mobile App**: Convert to Progressive Web App (PWA)

## 🐛 Common Issues & Solutions

### Date Validation Problems
- Ensure check-out date is after check-in date
- Set appropriate minimum dates
- Handle timezone differences

### Modal Not Displaying
- Check CSS display properties
- Verify modal HTML structure
- Ensure JavaScript functions are called correctly

### Search Not Working
- Verify JSON data structure
- Check search logic and string matching
- Ensure case-insensitive search

### Price Calculation Errors
- Validate date inputs before calculation
- Handle edge cases (same-day bookings)
- Ensure numeric data types

## 📖 Next Steps
1. Add user authentication system
2. Implement payment processing
3. Add email notification system
4. Create admin panel for hotel management
5. Add real-time availability checking
6. Implement booking confirmation system


## 🏨 Industry Concepts Covered
- **Inventory Management**: Hotel room availability
- **Dynamic Pricing**: Price calculation based on dates
- **Reservation Systems**: Booking workflow and confirmation
- **User Experience**: Intuitive booking interface
- **Data Validation**: Form validation and error handling

If you have any questions please feel free to ask the teachers around you! We wish you all good luck and A LOT of fun <3

EPITECH BARCELONA TEAM