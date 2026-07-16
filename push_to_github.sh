#!/bin/bash
# Exit on any error
set -e

# Verify environment variables
if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN environment variable is not set." >&2
  exit 1
fi

if [ -z "$GITHUB_USERNAME" ]; then
  # Try to fetch username using token
  echo "Fetching GitHub username using the provided token..."
  GITHUB_USERNAME=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | grep -oP '"login":\s*"\K[^"]+')
  if [ -z "$GITHUB_USERNAME" ]; then
    echo "Error: Could not retrieve GitHub username. Please set GITHUB_USERNAME manually." >&2
    exit 1
  fi
  echo "Successfully identified user: $GITHUB_USERNAME"
fi

REPO_NAME="kids-blog"

# Check if repo already exists on GitHub
echo "Checking if repository $REPO_NAME exists..."
REPO_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/repos/$GITHUB_USERNAME/$REPO_NAME)

if [ "$REPO_STATUS" -ne 200 ]; then
  echo "Repository does not exist. Creating repository $REPO_NAME..."
  CREATE_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -d "{\"name\":\"$REPO_NAME\",\"description\":\"Kids Learning educational website\",\"private\":false,\"has_issues\":true,\"has_projects\":true,\"has_wiki\":true}" \
    https://api.github.com/user/repos)
  
  if echo "$CREATE_RESPONSE" | grep -q '"message":'; then
    echo "Error creating repository: $(echo "$CREATE_RESPONSE" | grep '"message"')" >&2
    exit 1
  fi
  echo "Repository created successfully!"
else
  echo "Repository $REPO_NAME already exists on GitHub."
fi

# Configure remote and push
echo "Configuring remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "Pushing to GitHub..."
git push -u origin main --force

echo "Successfully pushed the project to https://github.com/$GITHUB_USERNAME/$REPO_NAME"
