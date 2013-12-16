#!/bin/bash

url='localhost:3000'
user='/user'
question='/question'
answer='/answer'
comment='/comment'

## Create a user
echo -e "\nCreate a user"
curl --data "name=foo&email=foo@bar.com" --request POST $url$user

## Get list of users
echo -e "\nGet list of users"
curl --request GET $url$user

## Get a user
echo -e "\nGet a single user"
curl --request GET "$url$user/1"

## Edit the user
echo -e "\nEdit the same user"
curl --data "name=edited&email=bar@baz.com" --request PUT "$url$user/1"

## Create a question
echo -e "\nCreate a question"
curl --data "content=foo?&author_id=1&title=question" --request POST $url$question

## Get the a list of questions
echo -e "\nGet list of questions"
curl --request GET $url$question

## Get a question
echo -e "\nGet a single question"
curl --request GET "$url$question/1"

## Edit the question
echo -e "\nEdit the question"
curl --data "content=bar?&author_id=1&title=editedquestion" --request PUT "$url$question/1"

## Answer the question
echo -e "\nAnswer the question"
curl --data "content=answer&author_id=1" --request POST "$url$question/1$answer"

## Comment on the question
echo -e "\nComment on the question"
curl --data "content=questioncomment&author_id=1" --request POST "$url$question/1$comment"

## Comment on the answer
echo -e "\nComment on the answer"
curl --data "content=answercomment&author_id=1" --request POST "$url$question/1$answer/1$comment"