# Git & Deployment Workflow

## Daily Workflow

### Making Changes
```bash
# Make your code changes
# Then commit and push:

git add .
git commit -m "Descriptive commit message"
git push origin main
```

### Vercel Auto-Deployment
- Vercel automatically deploys when you push to `main` branch
- Check deployment status at: https://vercel.com/dashboard

### Manual Vercel Deploy
```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## GitHub Repository
- **URL**: https://github.com/satagency/lattify-business
- **Clone**: `git clone https://github.com/satagency/lattify-business.git`

## Commit Best Practices
- Use descriptive commit messages
- Commit often (smaller commits are better)
- Push regularly to backup your work

## Branch Strategy (Optional)
```bash
# Create feature branch
git checkout -b feature/new-feature

# Work on feature, commit changes
git add .
git commit -m "Add new feature"

# Push branch
git push origin feature/new-feature

# Merge to main via GitHub PR or:
git checkout main
git merge feature/new-feature
git push origin main
```

## Troubleshooting

### If Vercel deploy fails
```bash
# Check build locally first
npm run build

# Then deploy
vercel --prod
```

### If GitHub push fails
```bash
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

