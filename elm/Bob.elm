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



/////////////////// R1D2
{- Obviously this code will be crap if you try to use it. Backpedalled to get to a more stable place -}

module Bob exposing (..)
import String exposing (contains)

hey: String -> String
hey phrase =
  respond phrase

respond : String -> String
respond conversation =
  if contains "?" conversation then "Sure."
  else if contains "!" conversation then "Whoa, chill out!"
  else "Whatever."

bob : String -> String
bob words =
  hey words
