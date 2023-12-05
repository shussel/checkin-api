# checkin-api
An Express JS/ MongoDB API used by [checkin-app](https://github.com/shussel/checkin-app}

## Schema
A Call represents time spent at a location with a series of periodic checkins.

`Call: {
  checkins: [
    {
      checkinTime: datetime,
      location: [latitude, longitude]
      checkinMessage: string
    },
    ...
  ]
}`

## Methods

**GET** /api/Call - returns a list of calls

**GET** /api/Call/:id - returns a single call

**POST** /api/Call/ - creates a new call

**PUT** /api/Call/:id - adds a checkin to a call

**DELETE** /api/Call/:id - deletes a call

## Tests

Includes basic API CRUD test that creates, reads, updates then deletes a Call using Jest and Supertest





