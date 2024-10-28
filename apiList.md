<!-- devtinder api -->
## authRouter
POST /sighinUp
POST /login
POST /logout

## profileRouter
get /profile/view
patch /profile/edit
patch /profile/password

## connectionReqRouter
POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:userId
POST /request/review/rejected/:userId

## userRouter
GET /user/connections
GET /user/request
GET /user/feed


