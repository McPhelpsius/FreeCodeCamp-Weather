module Bob exposing (..)

validateConversation conv =
  if conv.contains "?" == True then
    "Sure."
  else if conv.contains "!" == True then
    "Whoa, chill out!"
  else
    "Whatever."

bob : Maybe String -> String
bob conversation =
  case conversation of
    Just conversation ->
      validateConversation conversation
    Nothing ->
      "Fine. Be that way!"
