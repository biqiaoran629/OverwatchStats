# Project Title

Overwatch stats tracker for users to record their in game stats

## Getting Started

This project uses Node.js, Mongodb, and react.js

### Prerequisites

You need to have collections data in the mongodb, namely the heroes and maps.

```
db.heroes.insert([{
	"Name": "Doomfist",
	"Type": "Offense"
},
{
	"Name": "Doomfist",
	"Type": "Offense"
},
{
	"Name": "Genji",
	"Type": "Offense"
},
{
	"Name": "McCree",
	"Type": "Offense"
},
{
	"Name": "Pharah",
	"Type": "Offense"
},
{
	"Name": "Reaper",
	"Type": "Offense"
},
{
	"Name": "Soldier76",
	"Type": "Offense"
},
{
	"Name": "Sombra",
	"Type": "Offense"
},
{
	"Name": "Tracer",
	"Type": "Offense"
},
{
	"Name": "Bastion",
	"Type": "Defense"
},
{
	"Name": "Hanzo",
	"Type": "Defense"
},
{
	"Name": "Junkrat",
	"Type": "Defense"
},
{
	"Name": "Mei",
	"Type": "Defense"
},
{
	"Name": "Torbjorn",
	"Type": "Defense"
},
{
	"Name": "Widowmaker",
	"Type": "Defense"
},
{
	"Name": "Dva",
	"Type": "Tank"
},
{
	"Name": "Orisa",
	"Type": "Tank"
},
{
	"Name": "Reinhardt",
	"Type": "Tank"
},
{
	"Name": "Roadhog",
	"Type": "Tank"
},
{
	"Name": "Winston",
	"Type": "Tank"
},
{
	"Name": "Zarya",
	"Type": "Tank"
},
{
	"Name": "Ana",
	"Type": "Support"
},
{
	"Name": "Brigitte",
	"Type": "Support"
},
{
	"Name": "Lucio",
	"Type": "Support"
},
{
	"Name": "Mercy",
	"Type": "Support"
},
{
	"Name": "Moira",
	"Type": "Support"
},
{
	"Name": "Symmetra",
	"Type": "Support"
},
{
	"Name": "Zenyatta",
	"Type": "Support"
}]) 
```

```
db.maps.insert([{
	"Name": "Hanamura",
	"Type": "Assault"
},
{
	"Name": "Horizon Lunar Colony",
	"Type": "Assault"
},
{
	"Name": "Temple of Anubis",
	"Type": "Assault"
},
{
	"Name": "Volskaya Industries",
	"Type": "Assault"
},
{
	"Name": "Dorado",
	"Type": "Escort"
},
{
	"Name": "Junkertown",
	"Type": "Escort"
},
{
	"Name": "Route 66",
	"Type": "Escort"
},
{
	"Name": "Watchpoint: Gibralter",
	"Type": "Escort"
},
{
	"Name": "Blizzard World",
	"Type": "Hybrid"
},
{
	"Name": "Eichenwalde",
	"Type": "Hybrid"
},
{
	"Name": "Hollywood",
	"Type": "Hybrid"
},
{
	"Name": "King's Row",
	"Type": "Hybrid"
},
{
	"Name": "Numbani",
	"Type": "Hybrid"
},
{
	"Name": "Ilios",
	"Type": "Control"
},
{
	"Name": "Lijiang Tower",
	"Type": "Control"
},
{
	"Name": "Nepal",
	"Type": "Control"
},
{
	"Name": "Oasis",
	"Type": "Control"
}])
```


