
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);
  
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return distance;
  }
  
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  

function geofence(userLat,userLng,shopLat,shopLng,fenceRadius){
    // Calculate the distance between the user's location and the geofence center
    const distance = calculateDistance(userLat, userLng, shopLat, shopLng);

    // Check if the user is inside the geofence
    if (distance <= fenceRadius) {
      // Trigger an event when the user enters the geofence
      return true
    } 
    else {
      // Trigger an event when the user exits the geofence
        return false
    }
} 

module.exports = geofence