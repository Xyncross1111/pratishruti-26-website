# How to Update Artists in ArtistSection

## Quick Guide

The artist data is located at the top of the `ArtistSection.tsx` file in a constant called `PLACEHOLDER_ARTISTS`.

**Important**: Each artist card plays ONE specific song (track), not the full discography.

### Step 1: Get Spotify Track URIs

1. Open Spotify (desktop or web)
2. Find the **specific TRACK (song)** you want to play for that artist
3. Right-click on the **TRACK** (not the artist or album)
4. Select **Share** → **Copy Spotify URI**
5. You'll get something like: `spotify:track:3n3Ppam7vgaVa1iaRUc9Lp`

**Note**: Make sure you're copying the TRACK URI, not artist or album URI!

### Step 2: Get Artist Images

- Use artist promotional photos or album artwork
- Recommended size: 500x500px or larger (square format)
- Save images to `/public/images/artists/` folder
- Use formats: `.jpg`, `.png`, or `.webp`

### Step 3: Update the Artist Array

Open `components/atlantis/ArtistSection.tsx` and find the `PLACEHOLDER_ARTISTS` array (around line 10).

Replace the placeholder data with your actual artists:

```typescript
const PLACEHOLDER_ARTISTS = [
  {
    id: '1',
    name: 'Artist Name Here',           // Artist's full name
    genre: 'Rock',                      // Music genre
    image: '/images/artists/artist1.jpg', // Path to artist image
    spotifyUri: 'track/3n3Ppam7vgaVa1iaRUc9Lp', // TRACK URI (remove 'spotify:' prefix)
    description: 'Featured Song Title', // Song name or description
    songTitle: 'Actual Song Name',      // Optional: specific song name
  },
  {
    id: '2',
    name: 'Another Artist',
    genre: 'Electronic',
    image: '/images/artists/artist2.jpg',
    spotifyUri: 'track/0VjIjW4GlUZAMYd2vXMi3b', // TRACK URI only
    description: 'Featured Song Title',
    songTitle: 'Another Song Name',
  },
  // Add more artists as needed...
];
```

### Step 4: Spotify URI Format

When you copy a Spotify **TRACK** URI, it looks like: `spotify:track:3n3Ppam7vgaVa1iaRUc9Lp`

**Remove the `spotify:` prefix** and use only the part after it:
- ✅ Correct: `track/3n3Ppam7vgaVa1iaRUc9Lp`
- ❌ Wrong: `spotify:track:3n3Ppam7vgaVa1iaRUc9Lp`

**Important**: For the Artist Section, **ONLY use TRACK URIs**:
- ✅ **Use Tracks**: `track/TRACK_ID` - Plays one specific song
- ❌ Don't use Artist: `artist/ARTIST_ID` - Shows full discography
- ❌ Don't use Album: `album/ALBUM_ID` - Shows full album
- ❌ Don't use Playlist: `playlist/PLAYLIST_ID` - Shows playlist

### Example with Real Data

```typescript
const PLACEHOLDER_ARTISTS = [
  {
    id: '1',
    name: 'Dua Lipa',
    genre: 'Pop',
    image: '/images/artists/dua-lipa.jpg',
    spotifyUri: 'track/3n3Ppam7vgaVa1iaRUc9Lp', // "Mr. Brightside" example
    description: 'Levitating',
    songTitle: 'Levitating',
  },
  {
    id: '2',
    name: 'The Weeknd',
    genre: 'R&B',
    image: '/images/artists/the-weeknd.jpg',
    spotifyUri: 'track/0VjIjW4GlUZAMYd2vXMi3b', // "Blinding Lights" example
    description: 'Blinding Lights',
    songTitle: 'Blinding Lights',
  },
  {
    id: '3',
    name: 'Coldplay',
    genre: 'Alternative Rock',
    image: '/images/artists/coldplay.jpg',
    spotifyUri: 'track/7qiZfU4dY1lWllzX7mPBI', // Example track
    description: 'Viva La Vida',
    songTitle: 'Viva La Vida',
  },
  {
    id: '4',
    name: 'Billie Eilish',
    genre: 'Alternative',
    image: '/images/artists/billie-eilish.jpg',
    spotifyUri: 'track/4LRPiXqCikLlN15c3yImP7', // Example track
    description: 'bad guy',
    songTitle: 'bad guy',
  },
];

// Note: Replace the track IDs above with actual Spotify track URIs for your artists' songs
```
```

## Tips

- **Number of Artists**: You can have any number of artists. The grid automatically adjusts.
- **Image Quality**: Use high-quality square images for best results
- **Descriptions**: Keep descriptions short (1-2 lines max)
- **Testing**: After updating, click each artist card to verify Spotify embeds load correctly

## Troubleshooting

**Spotify embed not loading?**
- Check that you removed the `spotify:` prefix from the URI
- Verify the artist/album/track exists on Spotify
- Make sure you're using forward slashes: `artist/ID` not `artist:ID`

**Image not showing?**
- Verify the image path is correct
- Check that the image file exists in `/public/images/artists/`
- Use relative paths starting with `/`

**Need help?**
- The component is in: `components/atlantis/ArtistSection.tsx`
- Artist data starts around line 10
- Each artist needs: id, name, genre, image, spotifyUri
