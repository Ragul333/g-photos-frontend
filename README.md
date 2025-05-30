# Google Photos Clone - Frontend

## Overview
This is the frontend part of a Google Photos clone application built with React.js. It provides a user-friendly interface to upload, view, manage, and organize photos with limited features similar to Google Photos.

## Features

- **Photo Upload**
  - Upload photos via a modal popup with image preview before confirmation.
  - Supports multiple image uploads.
  
- **Photo Gallery**
  - Display all uploaded photos in a grid layout.

- **Full-Screen Photo Preview**
  - Click on any photo to open it in a full-screen preview.
  - Photo view includes options to favorite, trash, or restore photos.
  - Info panel slides in from the right showing photo metadata (tags, upload date, info).
  - The preview panel dynamically adjusts layout when the info panel is toggled.

- **Favorites**
  - Mark/unmark photos as favorites.
  - View all favorite photos in a dedicated section.

- **Trash / Soft Delete**
  - Soft delete photos (move to Trash instead of permanent delete).
  - Restore photos from Trash.
  - Permanent delete photos from Trash.

- **Tags and Metadata**
  - Add, edit, and view tags associated with each photo.
  - Search photos by tags.

- **Search Functionality**
  - Text search to find photos by tags or photo names.
  - Search bar integrated into the header.

## Technologies Used
- React.js 
- React Router
- Axios for API calls
- CSS / Tailwind CSS 
- React Icons 

## Setup Instructions

  1. git clone https://github.com/yourusername/google-photos-clone-frontend.git
  2. cd google-photos-clone-frontend
  3. npm install
  4. npm run dev
