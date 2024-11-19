import requests
import json
import re

access_token = ""

# Set headers with authorization token
headers = {
    "Authorization": f"Bearer {access_token}"
}

# Function to convert milliseconds to minutes and seconds
def convert_duration(duration_ms):
    minutes = duration_ms // 60000
    seconds = (duration_ms % 60000) // 1000
    return f"{minutes}:{seconds:02}"

# Function to fetch and save album details and tracks
def fetch_and_save_album(album_id):
    # Base URL for album tracks
    tracks_url = f"https://api.spotify.com/v1/albums/{album_id}/tracks"
    # Base URL for album details
    album_url = f"https://api.spotify.com/v1/albums/{album_id}"

    # Get album details
    album_response = requests.get(album_url, headers=headers)
    if album_response.status_code == 200:
        album_data = json.loads(album_response.text)
        album_name = album_data["name"]
        # Remove special characters and spaces from album name for filename
        filename = re.sub(r'\W+', '', album_name).lower() + ".json"
    else:
        print(f"Error fetching album details: {album_response.status_code}")
        return

    # Send GET request for album tracks
    response = requests.get(tracks_url, headers=headers)

    # Check for successful response (200 OK)
    if response.status_code == 200:
        # Parse JSON response
        data = json.loads(response.text)
        tracks = data["items"]

        # Prepare track information list
        track_list = []
        for track in tracks:
            track_info = {
                "name": track["name"],
                "artists": [artist["name"] for artist in track["artists"]],
                "length": convert_duration(track["duration_ms"]),
                "explicit": track["explicit"],
            }
            track_list.append(track_info)

        # Save data to JSON file
        with open(filename, "w") as outfile:
            json.dump(track_list, outfile, indent=4)  # Format JSON with indentation for readability
        print(f"Album tracks saved to {filename}")
    else:
        print(f"Error: {response.status_code}")

# Prompt user for album IDs
album_ids = input("Enter album IDs separated by commas: ").split(',')

# Fetch and save details for each album
for album_id in album_ids:
    fetch_and_save_album(album_id.strip())