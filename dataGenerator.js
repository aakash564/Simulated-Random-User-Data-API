const FIRST_NAMES_MALE = [
    "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Henry", "Alexander",
    "Michael", "Ethan", "Daniel", "Matthew", "Aiden", "Jackson", "Sebastian", "Julian", "Gabriel", "Owen"
];
const FIRST_NAMES_FEMALE = [
    "Olivia", "Emma", "Ava", "Sophia", "Isabella", "Charlotte", "Amelia", "Mia", "Harper", "Evelyn",
    "Abigail", "Emily", "Ella", "Madison", "Scarlett", "Grace", "Chloe", "Penelope", "Riley", "Layla"
];
const LAST_NAMES = [
    "Smith", "Johnson", "Brown", "Taylor", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Moore", "Young", "Allen"
];
const CITIES = [
    "New York", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Rome", "Madrid", "Moscow", "Dubai",
    "Shanghai", "Toronto", "Mexico City", "Cairo", "Rio de Janeiro", "Istanbul", "Seoul", "Jakarta"
];
const COUNTRIES = [
    "USA", "Canada", "UK", "Germany", "France", "Australia", "Japan", "Brazil", "India", "China",
    "Mexico", "Russia", "Spain", "Italy", "Egypt", "South Korea", "Turkey"
];
const DOMAINS = [
    "example.com", "testmail.net", "fictionalcorp.org", "usersim.io", "randomdata.co"
];

const PROFILE_PIC_URL = 'profile_placeholder.png';

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateNameAndGender() {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const firstNames = gender === 'male' ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE;
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(LAST_NAMES);
    return { firstName, lastName, gender };
}

export function generateUser(seed = Math.random()) {

    const { firstName, lastName, gender } = generateNameAndGender();

    // Normalize names for email generation
    const cleanFirstName = firstName.toLowerCase().replace(/\\s/g, '');
    const cleanLastName = lastName.toLowerCase().replace(/\\s/g, '');

    const formats = [
        `${cleanFirstName}.${cleanLastName}`,
        `${cleanFirstName}${cleanLastName.substring(0, 1)}`,
        `${cleanFirstName}${Math.floor(Math.random() * 99)}`,
    ];

    const emailPrefix = getRandomElement(formats);
    const domain = getRandomElement(DOMAINS);
    const email = `${emailPrefix}@${domain}`;

    const city = getRandomElement(CITIES);
    const country = getRandomElement(COUNTRIES);

    const registrationDate = new Date(Date.now() - Math.floor(Math.random() * 31536000000 * 5)); // up to 5 years ago

    return {
        id: crypto.randomUUID(),
        name: {
            title: gender === 'male' ? 'Mr' : 'Ms',
            first: firstName,
            last: lastName,
        },
        gender: gender,
        email: email,
        location: {
            city: city,
            country: country,
            timezone: `UTC${Math.random() < 0.5 ? '+' : '-'}${Math.floor(Math.random() * 12).toString().padStart(2, '0')}:00`,
        },
        login: {
            username: `${cleanFirstName}_${cleanLastName}${Math.floor(Math.random() * 100)}`,
        },
        registered: {
            date: registrationDate.toISOString().split('T')[0],
            age_days: Math.floor((Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24))
        },
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        picture: {
            large: PROFILE_PIC_URL,
            medium: PROFILE_PIC_URL,
            thumbnail: PROFILE_PIC_URL,
        },
    };
}
