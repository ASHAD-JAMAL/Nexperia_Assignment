"use client";
import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample blog post data
const BLOG_POSTS = [
  {
    id: "1",
    title: "The Ultimate Guide to AEM Component Development",
    author: "Jane Smith",
    publishDate: "2024-08-01",
    excerpt:
      "Learn the best practices for developing reusable and maintainable AEM components that follow Adobe's guidelines.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Development", "AEM"],
    tags: ["components", "best-practices", "java"],
  },
  {
    id: "2",
    title: "Optimizing AEM Performance: A Deep Dive",
    author: "John Doe",
    publishDate: "2024-07-25",
    excerpt:
      "Discover techniques to improve the performance of your AEM implementation, from caching strategies to efficient code.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Performance", "AEM"],
    tags: ["optimization", "caching", "dispatcher"],
  },
  {
    id: "3",
    title: "Implementing Accessibility in AEM Components",
    author: "Alex Johnson",
    publishDate: "2024-07-18",
    excerpt:
      "A comprehensive guide to ensuring your AEM components meet WCAG standards and provide an accessible experience.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Accessibility", "AEM"],
    tags: ["wcag", "a11y", "inclusive-design"],
  },
  {
    id: "4",
    title: "Sling Models: Advanced Techniques",
    author: "Sarah Williams",
    publishDate: "2024-07-10",
    excerpt:
      "Take your Sling Models to the next level with advanced techniques for data binding and business logic.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Development", "AEM"],
    tags: ["sling", "java", "models"],
  },
  {
    id: "5",
    title: "Content Fragments vs. Experience Fragments",
    author: "Michael Brown",
    publishDate: "2024-07-05",
    excerpt:
      "Understanding the differences between Content Fragments and Experience Fragments and when to use each in your AEM projects.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Content", "AEM"],
    tags: ["fragments", "headless", "content-management"],
  },
  {
    id: "6",
    title: "AEM as a Headless CMS",
    author: "Emily Davis",
    publishDate: "2024-06-28",
    excerpt:
      "Explore how to leverage AEM's headless capabilities to deliver content to multiple channels and applications.",
    featuredImage: "/placeholder.svg?height=300&width=500",
    categories: ["Headless", "AEM"],
    tags: ["api", "content-services", "graphql"],
  },
];

export default function AdvancedBlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const itemsPerPage = 3;

  // Filter and sort posts when search or sort changes
  useEffect(() => {
    let result = [...BLOG_POSTS];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.categories.some((cat) => cat.toLowerCase().includes(query)) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOrder === "date") {
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      } else if (sortOrder === "author") {
        return a.author.localeCompare(b.author);
      } else if (sortOrder === "category") {
        return a.categories[0].localeCompare(b.categories[0]);
      }
      return 0;
    });

    setFilteredPosts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = filteredPosts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">WKND Blog</h1>

      {/* Controls Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date (newest first)</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {visiblePosts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.featuredImage || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>

            <div className="flex flex-col flex-1 p-6">
              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                <a
                  href={`/blog/${post.id}`}
                  className="text-gray-900 hover:text-blue-600"
                >
                  {post.title}
                </a>
              </h2>

              <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                </div>

                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.publishDate)}</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <a
                    key={category}
                    href={`/blog?category=${category}`}
                    className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {category}
                  </a>
                ))}
              </div>

              <p className="text-gray-600 mb-6 flex-1">{post.excerpt}</p>

              <a
                href={`/blog/${post.id}`}
                className="text-blue-600 font-medium hover:text-blue-800 hover:underline inline-flex items-center"
              >
                Read More
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No blog posts found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria
          </p>
          <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex justify-center mt-8" aria-label="Blog pagination">
          <ul className="flex items-center gap-1">
            <li>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </li>

            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index}>
                <Button
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                  aria-current={currentPage === index + 1 ? "page" : undefined}
                  className="w-10"
                >
                  {index + 1}
                </Button>
              </li>
            ))}

            <li>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
