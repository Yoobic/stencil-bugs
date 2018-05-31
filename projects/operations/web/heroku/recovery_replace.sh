#!/usr/bin/env bash
if [[ -n $NEW_STRING ]] ; then
  echo ${REPLACE_FILES-main.bundle.js main.bundle.js.map} | xargs -t -P ${CONCURRENCY-1} -n 1 sed -i'.bkp' -e 's|'"${OLD_STRING//./\.}"'|'"$NEW_STRING"'|g'
fi
