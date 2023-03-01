# portfolio-site

Name: Brett Beattie
PID: A15485112
Netlify URL: https://brettbeattie.netlify.app/

CRUD solution description: Most of the functionality of this blog site is centered around our buttons (add, edit, delete). When the user clicks edit or delete for a certain blog post, we make use of the click event to find the specific button they clicked, and then traverse up the DOM tree to find which blog post is associated with that button to make sure we are editing or deleting the right blog post. We make updates to local storage by keeping an array of blog posts. When the user edits or deletes an existing blog post, we iterate through the array, checking for title, date, and summary equality until we find the matching post, perform the appropriate operation, then update local storage.