export interface Article {
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  link: string;
}

export const articles: Article[] = [
  {
    title: "Understanding Fall Prevention for Elderly: A Comprehensive Guide",
    description: "Learn about the latest techniques and technologies helping seniors stay safe at home.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&w=800&q=75",
    date: "Mar 15, 2024",
    category: "Guides",
    link: "https://www.nia.nih.gov/health/prevent-falls-and-fractures"
  },
  {
    title: "How Technology is Revolutionizing Elder Care",
    description: "Discover how AI and smart devices are making homes safer for our elderly loved ones.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&w=800&q=75",
    date: "Jan 30, 2024",
    category: "Insights",
    link: "https://www.who.int/news-room/fact-sheets/detail/falls"
  },
  {
    title: "The Importance of Quick Response in Fall Incidents",
    description: "Why the first hour after a fall is crucial and how to prepare for emergencies.",
    image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?auto=format&w=800&q=75",
    date: "Jan 29, 2024",
    category: "Safety",
    link: "https://www.cdc.gov/falls/index.html"
  }
]; 