<div align='center'>
  <h1>SEA Catering</h1>

  [![Logo banner](./docs/banner.png)](https://sea-catering.zenc.my.id/)
  -- Our Website --
  
  [sea-catering.zenc.my.id](https://sea-catering.zenc.my.id/)
</div>

## 🚀 Tech Stack
<div align="left">
  <a href"#"><img src="https://skillicons.dev/icons?i=next,js,react,tailwind,prisma,supabase" height="40" alt="html5 logo"  /></a>
  <!-- <img width="12" /> -->
  <!-- <img src="https://skillicons.dev/icons?i=postgres" height="40" alt="css3 logo"  /> -->
  <br><br>
</div>

- Frontend : Next.js (App router)
- DB : PostgreSQL + Supabase
- Auth : NextAuth
- ORM : Prisma
- UI : TailwindCSS + shadcn/ui
- Deployment : Vercel

## 🔥 Our Features
- Subscription 
- Customized meal menu
- Detail nutrition facts
- Ship to major cities
- Fresh from the experienced chefs

## 🧑‍💻 WebApp Features
- User registration and login
- User profile management
- Meal menu management
- Order management
- Admin dashboard

## ⬇️ Installation
Run on the local server:

### 1. Clone the repo
```bash 
git clone https://github.com/abiabdillahx/sea-catering.git
cd sea-catering
```
### 2. Install the dependencies
```bash
npm install
```
### 3. Create .env file
```bash
# add these environment variables
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=Your_PostgresHost_Url
NEXTAUTH_SECRET=the_nextauth_secret
```
### 4. Generate prisma client
```bash
npx prisma generate
```
### 5. Start the server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<!-- ## 📚 API Documentation
API documentation is available at [http://localhost:3000/api/docs]( -->