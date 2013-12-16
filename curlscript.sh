#!/bin/bash

url='localhost:3000'
user='/user'
question='/question'
answer='/answer'
comment='/comment'

## Create a user
echo -e "\n\nCreate a user\n"
curl --data "name=foo&email=foo@bar.com" --request POST $url$user -i

## Get list of users
echo -e "\n\nGet list of users\n"
curl --request GET $url$user -i

## Get a user
echo -e "\n\nGet a single user\n"
curl --request GET "$url$user/1" -i

## Edit the user
echo -e "\n\nEdit the same user\n"
curl --data "name=edited&email=bar@baz.com" --request PUT "$url$user/1" -i

## Create a question
echo -e "\n\nCreate a question\n"
curl --data "content=foo?&author_id=1&title=question" --request POST $url$question -i

## Get the a list of questions
echo -e "\n\nGet list of questions\n"
curl --request GET $url$question -i

## Get a question
echo -e "\n\nGet a single question\n"
curl --request GET "$url$question/1" -i

## Edit the question
echo -e "\n\nEdit the question\n"
curl --data "content=bar?&author_id=1&title=editedquestion" --request PUT "$url$question/1" -i

## Answer the question
echo -e "\n\nAnswer the question\n"
curl --data "content=answer&author_id=1" --request POST "$url$question/1$answer" -i

## Comment on the question
echo -e "\n\nComment on the question\n"
curl --data "content=questioncomment&author_id=1" --request POST "$url$question/1$comment" -i

## Comment on the answer
echo -e "\n\nComment on the answer\n"
curl --data "content=answercomment&author_id=1" --request POST "$url$question/1$answer/1$comment" -i