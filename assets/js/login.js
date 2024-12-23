// if (localStorage.getItem('authToken')) {
//     window.location.href = 'patient_profile.html';
// }

// document.querySelector('form').addEventListener('submit', async function (e) {
//     e.preventDefault();
    

//     const usernameOrEmail = document.getElementById('identifier').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: usernameOrEmail,
//                 password: password,
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Save the authentication token to localStorage
//             localStorage.setItem('authToken', data.key);
//             alert('Login successful!');
//             // Redirect to the profile page
//             window.location.href = 'patient_profile.html';
//         } else {
//             // Handle API errors
//             alert(`Login failed: ${data.detail || 'Please check your credentials.'}`);
//         }
//     } catch (error) {
//         // Handle network or other unexpected errors
//         console.error('Unexpected error:', error);
//         alert('An unexpected error occurred. Please try again later.');
//     }
// });


// login with save user data-------------------------------------------

if (localStorage.getItem('authToken')) {
    window.location.href = 'patient_profile.html';
}

document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const usernameOrEmail = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: usernameOrEmail,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('authToken', data.key);
            
            // Fetch user profile data after successful login
            const profileResponse = await fetch('https://vaccination-management-system-backend.vercel.app/api/auth/profile/', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${data.key}`,
                },
            });

            const profileData = await profileResponse.json();

            if (profileResponse.ok) {
                const userInfo = profileData.user.user; // Extract the nested user info
                const profileInfo = profileData.user;
                localStorage.setItem('userId', userInfo.id);
                localStorage.setItem('patientId', profileInfo.id);
                localStorage.setItem('username', userInfo.username);
                localStorage.setItem('email', userInfo.email);
                localStorage.setItem('userType', userInfo.user_type);

                alert('Login successful!');
                window.location.href = 'patient_profile.html';
            } else {
                alert('Failed to retrieve user profile. Please try again.');
            }
        } else {
            alert(`Login failed: ${data.detail || 'Please check your credentials.'}`);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again later.');
    }
});