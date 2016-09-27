#!/bin/bash

IFS=$'\n'
for f in $(git show-ref --heads); do
  hash=$(echo ${f} | cut -d' ' -f1)
  file=$(echo ${f} | cut -d' ' -f2)

  echo ${hash} > ".git/${file}"
done
