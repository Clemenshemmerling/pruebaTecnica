import axios from 'axios';
import config from '../config/config.js';

const getRandomMuser = async (result) => {
    try {
        const maximoPorPeticion = 5000;
        const requests = [];
        let restantes = result;

        while (restantes > 0) {
            const cantidad = Math.min(maximoPorPeticion, restantes);

            requests.push(
                axios.get(`${config.apiURL}${cantidad}`)
            );

            restantes -= cantidad;
        }
        const responses = await Promise.all(requests);
        const data = responses.flatMap(response => response.data.results);
        const totalUsers = data.length;
        let males =  0;
        let females =  0;
        let edades = 0;
        const countryCount = {};
        for (let i = 0; i < data.length; i++) {
            const country = data[i].location.country;
            edades += data[i].dob.age;
            if (data[i].gender === 'male') males++;
            else if (data[i].gender === 'female') females++;
            countryCount[country] = (countryCount[country] || 0) + 1;
        }

        const average_age = edades / totalUsers;

        const top_countries = Object.entries(countryCount).map(([country, count]) => ({ country, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        const response = {
            totalUsers,
            gender_distribution: {
                males,
                females
            },
            average_age,
            top_countries
        };
        
        return response;
    } catch (error) {
        console.error('Error fetching random user:', error);
        throw error;
    }
}

export default getRandomMuser;