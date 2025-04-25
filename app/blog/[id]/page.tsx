"use client"

import { useEffect, useState } from "react"
import { Calendar, User, Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample blog post data
const BLOG_POSTS = [
  {
    id: "1",
    title: "The Ultimate Guide to AEM Component Development",
    author: "Jane Smith",
    publishDate: "2024-08-01",
    content: `
      <p>Adobe Experience Manager (AEM) is a powerful content management system that allows developers to create reusable components for building websites and digital experiences. In this comprehensive guide, we'll explore the best practices for developing AEM components that are both maintainable and performant.</p>
      
      <h2>Understanding AEM Component Architecture</h2>
      <p>AEM components follow a modular architecture that separates concerns between the model, view, and controller. The Sling Model serves as the data model, HTL (HTML Template Language) handles the view, and OSGi services manage the business logic.</p>
      
      <p>When developing components, it's important to follow these principles:</p>
      <ul>
        <li>Single Responsibility: Each component should do one thing and do it well</li>
        <li>Composability: Components should be designed to work together</li>
        <li>Reusability: Components should be generic enough to be reused across the site</li>
        <li>Accessibility: Components must be accessible to all users</li>
      </ul>
      
      <h2>Implementing Sling Models</h2>
      <p>Sling Models provide a clean way to map JCR properties to Java objects. They should be used to encapsulate the business logic and data retrieval, keeping the HTL templates focused on presentation.</p>
      
      <h2>Writing Clean HTL Templates</h2>
      <p>HTL is AEM's preferred templating language. It's designed to be secure by default and encourages separation of concerns. Keep your HTL templates simple and focused on rendering the UI.</p>
      
      <h2>Client Libraries</h2>
      <p>Organize your CSS and JavaScript into client libraries to ensure proper dependency management and efficient loading. Use categories to control when and where your assets are loaded.</p>
      
      <h2>Testing Your Components</h2>
      <p>Implement unit tests for your Sling Models and integration tests for your components. AEM provides tools like the AEM Testing Clients to facilitate this process.</p>
      
      <h2>Conclusion</h2>
      <p>By following these best practices, you can create AEM components that are maintainable, performant, and provide a great experience for both content authors and end users.</p>
    `,
    excerpt:
      "Learn the best practices for developing reusable and maintainable AEM components that follow Adobe's guidelines.",
    featuredImage: "/placeholder.svg?height=500&width=1000",
    categories: ["Development", "AEM"],
    tags: ["components", "best-practices", "java"],
  },
  {
    id: "2",
    title: "Optimizing AEM Performance: A Deep Dive",
    author: "John Doe",
    publishDate: "2024-07-25",
    content: `
      <p>Performance is a critical aspect of any AEM implementation. In this article, we'll explore various techniques to optimize your AEM sites for speed and efficiency.</p>
      
      <h2>Caching Strategies</h2>
      <p>Effective caching is the cornerstone of AEM performance optimization. We'll discuss dispatcher caching, browser caching, and component-level caching strategies.</p>
      
      <h2>Optimizing Assets</h2>
      <p>Learn how to leverage AEM's DAM capabilities to optimize images and other assets for web delivery.</p>
      
      <h2>Efficient Java Code</h2>
      <p>Writing efficient Java code is essential for backend performance. We'll cover best practices for Sling Models, OSGi services, and background jobs.</p>
      
      <h2>Client-Side Optimization</h2>
      <p>Discover techniques for optimizing JavaScript and CSS to improve frontend performance and user experience.</p>
    `,
    excerpt:
      "Discover techniques to improve the performance of your AEM implementation, from caching strategies to efficient code.",
    featuredImage: "/placeholder.svg?height=500&width=1000",
    categories: ["Performance", "AEM"],
    tags: ["optimization", "caching", "dispatcher"],
  },
  {
    id: "3",
    title: "Implementing Accessibility in AEM Components",
    author: "Alex Johnson",
    publishDate: "2024-07-18",
    content: `
      <p>Accessibility is not just a legal requirement but a moral imperative. This guide explores how to ensure your AEM components meet WCAG standards and provide an inclusive experience for all users.</p>
      
      <h2>Understanding WCAG Guidelines</h2>
      <p>The Web Content Accessibility Guidelines (WCAG) provide a framework for making web content accessible. We'll cover the key principles: Perceivable, Operable, Understandable, and Robust.</p>
      
      <h2>Semantic HTML in HTL</h2>
      <p>Using semantic HTML is the foundation of accessible components. Learn how to structure your HTL templates to use the right elements for the right purpose.</p>
      
      <h2>ARIA Attributes</h2>
      <p>When HTML semantics aren't enough, ARIA attributes can provide additional context for assistive technologies. We'll explore how to use them effectively in AEM components.</p>
      
      <h2>Keyboard Navigation</h2>
      <p>Ensuring components are fully operable via keyboard is essential for accessibility. Learn techniques for implementing proper focus management and keyboard interactions.</p>
      
      <h2>Testing for Accessibility</h2>
      <p>Discover tools and methodologies for testing the accessibility of your AEM components, including automated testing and manual audits.</p>
    `,
    excerpt:
      "A comprehensive guide to ensuring your AEM components meet WCAG standards and provide an accessible experience.",
    featuredImage: "/placeholder.svg?height=500&width=1000",
    categories: ["Accessibility", "AEM"],
    tags: ["wcag", "a11y", "inclusive-design"],
  },
]

// Sample related posts function
const getRelatedPosts = (postId, count = 2) => {
  return BLOG_POSTS.filter((post) => post.id !== postId).slice(0, count)
}

export default function BlogPostDetail({ params }) {
  const { id } = params
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundPost = BLOG_POSTS.find((p) => p.id === id)
      if (foundPost) {
        setPost(foundPost)
        setRelatedPosts(getRelatedPosts(id))
      }
      setLoading(false)
    }, 500)
  }, [id])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-12"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back to Blog Link */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Featured Image */}
        <div className="relative h-80 w-full">
          <img src={post.featuredImage || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Post Header */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center text-gray-500 mb-8 gap-x-6 gap-y-2">
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              <span>{post.author}</span>
            </div>

            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{formatDate(post.publishDate)}</span>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <a
                key={category}
                href={`/?category=${category}`}
                className="text-sm font-medium px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {category}
              </a>
            ))}
          </div>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-5 w-5 text-gray-500" />
              {post.tags.map((tag) => (
                <a
                  key={tag}
                  href={`/?tag=${tag}`}
                  className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article key={relatedPost.id} className="flex bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="w-1/3 relative">
                  <img
                    src={relatedPost.featuredImage || "/placeholder.svg"}
                    alt={relatedPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="w-2/3 p-4">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    <a href={`/blog/${relatedPost.id}`} className="text-gray-900 hover:text-blue-600">
                      {relatedPost.title}
                    </a>
                  </h3>

                  <div className="text-sm text-gray-500 mb-2">{formatDate(relatedPost.publishDate)}</div>

                  <a
                    href={`/blog/${relatedPost.id}`}
                    className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
