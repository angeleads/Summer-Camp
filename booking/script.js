// Global variables
let hotels = []
let bookings = []
let searchResults = []

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  loadData()
  setupEventListeners()
  setMinDates()
  showSection("search")
})

// Load data from JSON file
async function loadData() {
  try {
    const response = await fetch("data.json")
    const data = await response.json()
    hotels = data.hotels
    bookings = data.bookings

    displayFeaturedHotels()
    displayBookings()
  } catch (error) {
    console.error("Error loading data:", error)
    // Use sample data if JSON fails to load
    loadSampleData()
  }
}

// Setup event listeners
function setupEventListeners() {
  const searchForm = document.getElementById("search-form")
  searchForm.addEventListener("submit", handleSearch)

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    const modal = document.getElementById("booking-modal")
    if (event.target === modal) {
      closeBookingModal()
    }
  })
}

// Set minimum dates for check-in and check-out
function setMinDates() {
  const today = new Date().toISOString().split("T")[0]
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowStr = tomorrow.toISOString().split("T")[0]

  document.getElementById("check-in").min = today
  document.getElementById("check-out").min = tomorrowStr

  // Update check-out min date when check-in changes
  document.getElementById("check-in").addEventListener("change", function () {
    const checkInDate = new Date(this.value)
    checkInDate.setDate(checkInDate.getDate() + 1)
    document.getElementById("check-out").min = checkInDate.toISOString().split("T")[0]
  })
}

// Handle search form submission
function handleSearch(e) {
  e.preventDefault()

  const destination = document.getElementById("destination").value
  const checkIn = document.getElementById("check-in").value
  const checkOut = document.getElementById("check-out").value
  const guests = document.getElementById("guests").value

  // Simple search - filter hotels by destination
  searchResults = hotels.filter(
    (hotel) =>
      hotel.location.toLowerCase().includes(destination.toLowerCase()) ||
      hotel.name.toLowerCase().includes(destination.toLowerCase()),
  )

  displaySearchResults(searchResults, { destination, checkIn, checkOut, guests })
}

// Display search results
function displaySearchResults(results, searchParams) {
  const searchResultsSection = document.getElementById("search-results")
  const hotelsGrid = document.getElementById("hotels-grid")

  searchResultsSection.style.display = "block"
  hotelsGrid.innerHTML = ""

  if (results.length === 0) {
    hotelsGrid.innerHTML =
      '<p class="no-results">No hotels found for your search criteria. Try a different destination.</p>'
    return
  }

  results.forEach((hotel) => {
    const hotelCard = createHotelCard(hotel, searchParams)
    hotelsGrid.appendChild(hotelCard)
  })
}

// Create hotel card element
function createHotelCard(hotel, searchParams = null) {
  const card = document.createElement("div")
  card.className = "hotel-card"

  const stars = "★".repeat(hotel.rating)
  const amenitiesHtml = hotel.amenities.map((amenity) => `<span class="amenity">${amenity}</span>`).join("")

  card.innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}" class="hotel-image" onerror="this.src='https://semantic-ui.com/images/wireframe/image.png'">
        <div class="hotel-info">
            <h3 class="hotel-name">${hotel.name}</h3>
            <div class="hotel-location">📍 ${hotel.location}</div>
            <div class="hotel-rating">
                <span class="stars">${stars}</span>
                <span>(${hotel.rating}/5)</span>
            </div>
            <div class="hotel-price">$${hotel.pricePerNight}/night</div>
            <div class="hotel-amenities">
                ${amenitiesHtml}
            </div>
            <button class="btn btn-primary" onclick="openBookingModal(${hotel.id}${searchParams ? `, ${JSON.stringify(searchParams)}` : ""})">
                Book Now
            </button>
        </div>
    `

  return card
}

// Display featured hotels
function displayFeaturedHotels() {
  const hotelsShowcase = document.getElementById("hotels-showcase")
  hotelsShowcase.innerHTML = ""

  hotels.forEach((hotel) => {
    const hotelCard = createHotelCard(hotel)
    hotelsShowcase.appendChild(hotelCard)
  })
}

// Open booking modal
function openBookingModal(hotelId, searchParams = null) {
  const hotel = hotels.find((h) => h.id === hotelId)
  if (!hotel) return

  const modal = document.getElementById("booking-modal")
  const bookingDetails = document.getElementById("booking-details")

  // Calculate dates and nights
  let checkIn = ""
  let checkOut = ""
  let nights = 1
  let guests = 1

  if (searchParams) {
    checkIn = searchParams.checkIn
    checkOut = searchParams.checkOut
    guests = searchParams.guests

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    }
  }

  const totalPrice = hotel.pricePerNight * nights

  bookingDetails.innerHTML = `
        <div class="booking-summary">
            <h3>${hotel.name}</h3>
            <p><strong>Location:</strong> ${hotel.location}</p>
            <p><strong>Rating:</strong> ${"★".repeat(hotel.rating)} (${hotel.rating}/5)</p>
            <p><strong>Price per night:</strong> $${hotel.pricePerNight}</p>
            <p><strong>Number of nights:</strong> ${nights}</p>
            <p><strong>Total Price:</strong> $${totalPrice}</p>
        </div>
        
        <form class="booking-form" onsubmit="submitBooking(event, ${hotelId})">
            <div class="form-group">
                <label for="guest-name">Full Name</label>
                <input type="text" id="guest-name" required>
            </div>
            
            <div class="form-group">
                <label for="guest-email">Email</label>
                <input type="email" id="guest-email" required>
            </div>
            
            <div class="form-group">
                <label for="guest-phone">Phone Number</label>
                <input type="tel" id="guest-phone" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="modal-check-in">Check-in Date</label>
                    <input type="date" id="modal-check-in" value="${checkIn}" required>
                </div>
                <div class="form-group">
                    <label for="modal-check-out">Check-out Date</label>
                    <input type="date" id="modal-check-out" value="${checkOut}" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="modal-guests">Number of Guests</label>
                <select id="modal-guests" required>
                    <option value="1" ${guests == 1 ? "selected" : ""}>1 Guest</option>
                    <option value="2" ${guests == 2 ? "selected" : ""}>2 Guests</option>
                    <option value="3" ${guests == 3 ? "selected" : ""}>3 Guests</option>
                    <option value="4" ${guests == 4 ? "selected" : ""}>4 Guests</option>
                    <option value="5" ${guests >= 5 ? "selected" : ""}>5+ Guests</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="special-requests">Special Requests (Optional)</label>
                <textarea id="special-requests" rows="3" placeholder="Any special requests or requirements..."></textarea>
            </div>
            
            <button type="submit" class="btn btn-success btn-large">Confirm Booking</button>
        </form>
    `

  modal.style.display = "block"

  // Set up date change listeners for price calculation
  setupModalDateListeners(hotel.pricePerNight)
}

// Setup date change listeners in modal
function setupModalDateListeners(pricePerNight) {
  const checkInInput = document.getElementById("modal-check-in")
  const checkOutInput = document.getElementById("modal-check-out")

  function updatePrice() {
    const checkIn = checkInInput.value
    const checkOut = checkOutInput.value

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))

      if (nights > 0) {
        const totalPrice = pricePerNight * nights
        const summaryElement = document.querySelector(".booking-summary")
        summaryElement.innerHTML = summaryElement.innerHTML
          .replace(/Number of nights:<\/strong> \d+/, `Number of nights:</strong> ${nights}`)
          .replace(/Total Price:<\/strong> \$\d+/, `Total Price:</strong> $${totalPrice}`)
      }
    }
  }

  checkInInput.addEventListener("change", updatePrice)
  checkOutInput.addEventListener("change", updatePrice)
}

// Close booking modal
function closeBookingModal() {
  document.getElementById("booking-modal").style.display = "none"
}

// Submit booking
function submitBooking(e, hotelId) {
  e.preventDefault()

  const hotel = hotels.find((h) => h.id === hotelId)
  const guestName = document.getElementById("guest-name").value
  const guestEmail = document.getElementById("guest-email").value
  const guestPhone = document.getElementById("guest-phone").value
  const checkIn = document.getElementById("modal-check-in").value
  const checkOut = document.getElementById("modal-check-out").value
  const guests = document.getElementById("modal-guests").value
  const specialRequests = document.getElementById("special-requests").value

  // Calculate total price
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  const totalPrice = hotel.pricePerNight * nights

  // Create new booking
  const newBooking = {
    id: bookings.length + 1,
    hotelId: hotelId,
    hotelName: hotel.name,
    hotelLocation: hotel.location,
    guestName: guestName,
    guestEmail: guestEmail,
    guestPhone: guestPhone,
    checkIn: checkIn,
    checkOut: checkOut,
    guests: Number.parseInt(guests),
    nights: nights,
    totalPrice: totalPrice,
    specialRequests: specialRequests,
    status: "confirmed",
    bookingDate: new Date().toISOString(),
  }

  // Add to bookings array
  bookings.push(newBooking)

  // Close modal and show success message
  closeBookingModal()
  alert(`Booking confirmed! Your reservation at ${hotel.name} has been successfully booked.`)

  // Refresh bookings display
  displayBookings()

  // Switch to bookings section
  showSection("bookings")
}

// Display user bookings
function displayBookings() {
  const bookingsList = document.getElementById("bookings-list")
  bookingsList.innerHTML = ""

  if (bookings.length === 0) {
    bookingsList.innerHTML =
      '<p class="no-bookings">You have no bookings yet. <a href="#search" onclick="showSection(\'search\')">Search for hotels</a> to make your first booking!</p>'
    return
  }

  // Sort bookings by booking date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))

  sortedBookings.forEach((booking) => {
    const bookingCard = createBookingCard(booking)
    bookingsList.appendChild(bookingCard)
  })
}

// Create booking card element
function createBookingCard(booking) {
  const card = document.createElement("div")
  card.className = "booking-card"

  const checkInDate = new Date(booking.checkIn).toLocaleDateString()
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString()
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString()

  card.innerHTML = `
        <div class="booking-header">
            <h3>${booking.hotelName}</h3>
            <span class="booking-status status-${booking.status}">${booking.status.toUpperCase()}</span>
        </div>
        
        <div class="booking-details">
            <div class="booking-detail">
                <strong>Location</strong>
                <span>${booking.hotelLocation}</span>
            </div>
            <div class="booking-detail">
                <strong>Guest Name</strong>
                <span>${booking.guestName}</span>
            </div>
            <div class="booking-detail">
                <strong>Check-in</strong>
                <span>${checkInDate}</span>
            </div>
            <div class="booking-detail">
                <strong>Check-out</strong>
                <span>${checkOutDate}</span>
            </div>
            <div class="booking-detail">
                <strong>Guests</strong>
                <span>${booking.guests} ${booking.guests === 1 ? "Guest" : "Guests"}</span>
            </div>
            <div class="booking-detail">
                <strong>Nights</strong>
                <span>${booking.nights} ${booking.nights === 1 ? "Night" : "Nights"}</span>
            </div>
            <div class="booking-detail">
                <strong>Total Price</strong>
                <span>$${booking.totalPrice}</span>
            </div>
            <div class="booking-detail">
                <strong>Booking Date</strong>
                <span>${bookingDate}</span>
            </div>
        </div>
        
        ${
          booking.specialRequests
            ? `
            <div class="special-requests">
                <strong>Special Requests:</strong>
                <p>${booking.specialRequests}</p>
            </div>
        `
            : ""
        }
        
        <div class="booking-actions">
            <button class="btn btn-secondary" onclick="cancelBooking(${booking.id})">Cancel Booking</button>
            <button class="btn btn-primary" onclick="modifyBooking(${booking.id})">Modify Booking</button>
        </div>
    `

  return card
}

// Cancel booking
function cancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    bookings = bookings.filter((booking) => booking.id !== bookingId)
    displayBookings()
    alert("Booking cancelled successfully.")
  }
}

// Modify booking (placeholder function)
function modifyBooking(bookingId) {
  const booking = bookings.find((b) => b.id === bookingId)
  if (booking) {
    alert(
      `Modify booking feature would open a form to edit booking for ${booking.hotelName}. This is a placeholder for the full implementation.`,
    )
  }
}

// Show different sections
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section")
  sections.forEach((section) => section.classList.remove("active"))

  // Show selected section
  const targetSection = document.getElementById(`${sectionName}-section`)
  if (targetSection) {
    targetSection.classList.add("active")
  }

  // Update navigation
  const navLinks = document.querySelectorAll(".nav a")
  navLinks.forEach((link) => (link.style.backgroundColor = "transparent"))

  const activeLink = document.querySelector(`.nav a[href="#${sectionName}"]`)
  if (activeLink) {
    activeLink.style.backgroundColor = "rgba(255,255,255,0.2)"
  }
}

// Load sample data if JSON fails
function loadSampleData() {
  hotels = [
    {
      id: 1,
      name: "Grand Plaza Hotel",
      location: "New York, NY",
      rating: 5,
      pricePerNight: 299,
      image: "https://semantic-ui.com/images/wireframe/image.png",
      amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Spa"],
    },
    {
      id: 2,
      name: "Seaside Resort",
      location: "Miami, FL",
      rating: 4,
      pricePerNight: 199,
      image: "https://semantic-ui.com/images/wireframe/image.png",
      amenities: ["WiFi", "Beach Access", "Pool", "Restaurant"],
    },
  ]

  bookings = []

  displayFeaturedHotels()
  displayBookings()
}

// CRUD Operations for hotels
function addHotel(hotelData) {
  const newHotel = {
    id: hotels.length + 1,
    ...hotelData,
  }
  hotels.push(newHotel)
  displayFeaturedHotels()
}

function updateHotel(hotelId, updatedData) {
  const hotelIndex = hotels.findIndex((h) => h.id === hotelId)
  if (hotelIndex !== -1) {
    hotels[hotelIndex] = { ...hotels[hotelIndex], ...updatedData }
    displayFeaturedHotels()
  }
}

function deleteHotel(hotelId) {
  hotels = hotels.filter((h) => h.id !== hotelId)
  displayFeaturedHotels()
}
