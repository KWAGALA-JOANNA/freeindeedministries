const MapSection = () => {
    return (
      <div className="map-section" style={{ textAlign: 'center', margin: '20px auto', padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '2rem', color: '#333' }}>Get Directions to our Headquarters</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const currentLocation = e.target.elements.currentLocation.value;
            if (currentLocation) {
              const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                currentLocation
              )}&destination=Masajja+Kumasomero&travelmode=driving`;
              window.open(url, '_blank');
            } else {
              alert('Please enter your current location.');
            }
          }}
          style={{ marginBottom: '20px' }}
        >
          <input
            type="text"
            name="currentLocation"
            placeholder="Enter your current location"
            style={{
              padding: '10px',
              width: '70%',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              marginLeft: '10px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Get Directions
          </button>
        </form>
        <div
          id="map"
          style={{
            position: 'relative',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '90%',
            margin: '0 auto',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.981117123435!2d32.507637494013!3d0.2735812839056986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177db9748577f00f%3A0xa0c2f76819fda2b0!2sMasajja%20Kumasomero!5e0!3m2!1sen!2sug!4v1732185775212!5m2!1sen!2sug"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Directions to our headquarters"
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default MapSection;
  