$(document).ready(function () {

    const heroNumber = $('#heroNumber')
    const heroForm = $('#heroForm')
    const heroDetails = $('#heroDetails')
    heroForm.on('submit', function (e) {

        e.preventDefault()

        heroNumber.removeClass('is-valid is-invalid')

        const heroNumberInteger = parseFloat(heroNumber.val())
        if (heroNumberInteger <= 0 || heroNumberInteger > 731) {
            alert('El Superhero debe estar entre los numeros 1 y 731')
            heroNumber.addClass('is-invalid')
            return
        }
        heroNumber.addClass('is-valid')

        $.ajax({
            url: `https://www.superheroapi.com/api.php/2792323770908354/${heroNumberInteger}`,
            method: 'GET',
            success(hero) {
                const heroInfo = {
                    name: hero.name,
                    gender: hero.appearance.gender,
                    occupation: hero.work.occupation,
                    publisher: hero.biography.publisher,
                    affiliation: hero.connections['group-affiliation'],
                    image: hero.image.url,
                    intelligence : hero.powerstats.intelligence,
                    strength : hero.powerstats.strength,
                    speed : hero.powerstats.speed,
                    durability : hero.powerstats.durability,
                    power : hero.powerstats.power,
                    combat : hero.powerstats.combat
                }
                heroDetails.html(`
                    <h5>SuperHero encontrado !</h5>
                    <div class="col-12 col-md-6 card mb-3">
                        <div class="row g-0">
                            <div class="col-md-6">
                                <img src="${heroInfo.image}" class="img-fluid rounded-start" alt="imagen de superheroe ${heroInfo.name}">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${heroInfo.name}</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">Género: ${heroInfo.gender}</li>
                                        <li class="list-group-item">Ocupación: ${heroInfo.occupation}</li>
                                        <li class="list-group-item">Afiliaciones: ${heroInfo.affiliation}</li>
                                        <li class="list-group-item">Editora: ${heroInfo.publisher}</li> 
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="chartContainer" class="col-12 col-md-6" style="height: 370px;"></div>
                `)
                const chart = new CanvasJS.Chart("chartContainer", {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: `Estadisticas de Poder para ${heroInfo.name}`
                    },
                    legend:{
                        cursor: "pointer",   
                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        indexLabel: "{name} ({y})",
                        dataPoints: [
                            { y: `${heroInfo.intelligence}`, name: "Intelligence"},
                            { y: `${heroInfo.strength}`, name: "Strength" },
                            { y: `${heroInfo.speed}`, name: "Speed" },
                            { y: `${heroInfo.durability}`, name: "Durability" },
                            { y: `${heroInfo.power}`, name: "Power" },
                            { y: `${heroInfo.combat}`, name: "Combat" },
                        ]
                    }]
                });
                chart.render();  
            },
            error(err) {
                console.log(err)
                return
            }
        })
    })
})


    
    
    

