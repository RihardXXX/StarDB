
export default class SwapiService {
    _apiBase = `https://swapi.dev/api/`;

    async getResourse(url){
        const res = await fetch(`${this._apiBase}${url}`);
        if(!res.ok){
            throw new Error(`Could not fetch ${url}`);
        }
        return  res.json();
    }

    async getPeople(){
        const people = await this.getResourse(`people/`);
        return people.results.map(this.transformPerson);
    }

    async getPerson(id){
        const person = await this.getResourse(`people/${id}`);
        return this.transformPerson(person);
    }

    async getAllPlanets(){
        const planets = await this.getResourse(`planets/`);
        return planets.results.map(this.transformPlanet);
    }

    async getPlanet(id){
        const planet = await this.getResourse(`planets/${id}`);
        return this.transformPlanet(planet);
    }

    async getStarships(){
        const starships= await this.getResourse(`starships/`);
        return starships.results.map(this.transformStarship);
    }

    async getStarship(id){
        const starShip = await this.getResourse(`starships/${id}`);
        return this.transformStarship(starShip);
    }

    extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    transformPlanet(planet){
        return {
            id: this.extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
        }
    }

    transformStarship(starShip){
        return {
            id: this.extractId(starShip),
            name: starShip.name,
            model: starShip.model,
            manufacturer: starShip.manufacturer,
            costInCredits: starShip.costInCredits,
            length: starShip.length,
            crew: starShip.crew,
            passengers: starShip.passengers,
            cargoCapacity: starShip.cargoCapacity
        }
    }

    transformPerson(person){
        return {
            id: this.extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }
}
