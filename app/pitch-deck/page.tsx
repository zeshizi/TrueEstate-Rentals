"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Users,
  DollarSign,
  Shield,
  Zap,
  Target,
  Award,
  Building,
  BarChart3,
  Globe,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Eye,
  Brain,
} from "lucide-react"

const slides = [
  {
    id: 1,
    title: "TrueEstate",
    subtitle: "The World's First Wealth Intelligence Real Estate Platform",
    content: (
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TrueEstate
          </div>
          <div className="text-xl text-gray-600 mt-4">
            Revolutionizing Real Estate with Wealth Intelligence
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <div className="font-semibold">See Beyond Properties</div>
            <div className="text-sm text-gray-600">Discover owner wealth & investment potential</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div className="font-semibold">AI-Powered Insights</div>
            <div className="text-sm text-gray-600">Advanced analytics for smarter decisions</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <div className="font-semibold">Precision Targeting</div>
            <div className="text-sm text-gray-600">Find high-value opportunities instantly</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "The Problem",
    subtitle: "Real Estate Industry Lacks Wealth Intelligence",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-red-600">Current Challenges</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold">Blind Property Searches</div>
                  <div className="text-sm text-gray-600">No insight into owner wealth or investment potential</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold">Inefficient Agent Prospecting</div>
                  <div className="text-sm text-gray-600">Agents waste time on low-value leads</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold">Limited Investment Analysis</div>
                  <div className="text-sm text-gray-600">No comprehensive wealth data for decision making</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-600">Market Impact</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-red-50 border-red-200">
                <div className="text-3xl font-bold text-red-600">$2.3T</div>
                <div className="text-sm">US Real Estate Market Size</div>
              </Card>
              <Card className="p-4 bg-orange-50 border-orange-200">
                <div className="text-3xl font-bold text-orange-600">40%</div>
                <div className="text-sm">Agent Time Wasted on Poor Leads</div>
              </Card>
              <Card className="p-4 bg-yellow-50 border-yellow-200">
                <div className="text-3xl font-bold text-yellow-600">60%</div>
                <div className="text-sm">Investment Decisions Made Blindly</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Our Solution",
    subtitle: "TrueEstate: Wealth Intelligence Meets Real Estate",
    content: (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <div className="text-lg text-gray-600">
            The first platform to combine property data with comprehensive wealth intelligence
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Property Intelligence</h3>
              <ul className="text-sm space-y-2 text-left">
                <li>• 130+ luxury properties across all 50 states</li>
                <li>• Real-time market valuations</li>
                <li>• Investment potential scoring</li>
                <li>• Historical performance data</li>
              </ul>
            </div>
          </Card>
          
          <Card className="p-6 border-2 border-purple-200 bg-purple-50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Wealth Analysis</h3>
              <ul className="text-sm space-y-2 text-left">
                <li>• Owner net worth verification</li>
                <li>• Business ownership mapping</li>
                <li>• Investment portfolio analysis</li>
                <li>• Risk assessment scoring</li>
              </ul>
            </div>
          </Card>
          
          <Card className="p-6 border-2 border-green-200 bg-green-50">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Smart Targeting</h3>
              <ul className="text-sm space-y-2 text-left">
                <li>• AI-powered lead scoring</li>
                <li>• Behavioral pattern analysis</li>
                <li>• Predictive buying signals</li>
                <li>• Automated prospect ranking</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "Market Opportunity",
    subtitle: "Massive Addressable Market with Clear Growth Trajectory",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Total Addressable Market</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="text-3xl font-bold">$2.3T</div>
                <div className="text-sm opacity-90">US Real Estate Market</div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="text-3xl font-bold">$45B</div>
                <div className="text-sm opacity-90">Wealth Management Tech</div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="text-3xl font-bold">$12B</div>
                <div className="text-sm opacity-90">PropTech Market</div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Target Segments</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Real Estate Agents</div>
                  <div className="text-sm text-gray-600">2.1M professionals</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">$8B</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Wealth Managers</div>
                  <div className="text-sm text-gray-600">310K professionals</div>
                </div>
                <div className="text-2xl font-bold text-purple-600">$15B</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">Property Investors</div>
                  <div className="text-sm text-gray-600">8.5M active investors</div>
                </div>
                <div className="text-2xl font-bold text-green-600">$22B</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-gray-800">$45B+ Combined Market Opportunity</div>
          <div className="text-gray-600 mt-2">Growing at 15% CAGR with increasing demand for data-driven real estate decisions</div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Competitive Advantage",
    subtitle: "First-Mover Advantage in Wealth Intelligence Real Estate",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-600">TrueEstate Advantages</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold">Unique Wealth Intelligence</div>
                  <div className="text-sm text-gray-600">Only platform combining property + owner wealth data</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold">AI-Powered Analytics</div>
                  <div className="text-sm text-gray-600">Advanced algorithms for predictive insights</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold">Comprehensive Coverage</div>
                  <div className="text-sm text-gray-600">All 50 states with verified data sources</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-sm text-gray-600">Bank-grade encryption and compliance</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-600">Traditional Competitors</h3>
            <div className="space-y-4">
              <Card className="p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Zillow</div>
                    <div className="text-sm text-gray-600">Property data only</div>
                  </div>
                  <Badge variant="outline">Limited</Badge>
                </div>
              </Card>
              <Card className="p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Realtor.com</div>
                    <div className="text-sm text-gray-600">Basic property listings</div>
                  </div>
                  <Badge variant="outline">Basic</Badge>
                </div>
              </Card>
              <Card className="p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Wealth Platforms</div>
                    <div className="text-sm text-gray-600">No property integration</div>
                  </div>
                  <Badge variant="outline">Separate</Badge>
                </div>
              </Card>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <div className="font-bold text-blue-800">Market Gap</div>
              <div className="text-sm text-blue-700">No existing platform combines wealth intelligence with real estate data</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "Business Model",
    subtitle: "Multiple Revenue Streams with High Scalability",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-blue-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">SaaS Subscriptions</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">$99-$999/mo</div>
                <div className="text-sm text-gray-600">Tiered pricing for agents, teams, and enterprises</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-2 border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Premium Analytics</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">$0.50-$5</div>
                <div className="text-sm text-gray-600">Per detailed wealth report or analysis</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-2 border-green-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">Enterprise Licensing</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">$10K-$100K</div>
                <div className="text-sm text-gray-600">Custom solutions for large brokerages</div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Revenue Projections</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold">Year 1</span>
                <span className="text-xl font-bold text-blue-600">$2.5M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold">Year 2</span>
                <span className="text-xl font-bold text-purple-600">$12M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-semibold">Year 3</span>
                <span className="text-xl font-bold text-green-600">$45M</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Key Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <span>Customer LTV</span>
                <span className="font-bold">$15,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span>CAC Payback</span>
                <span className="font-bold">8 months</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Gross Margin</span>
                <span className="font-bold">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "Technology Stack",
    subtitle: "Built for Scale with Enterprise-Grade Security",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Core Technology</h3>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-blue-500">
                <div className="font-semibold">Frontend</div>
                <div className="text-sm text-gray-600">Next.js 14, React, TypeScript, Tailwind CSS</div>
              </Card>
              <Card className="p-4 border-l-4 border-green-500">
                <div className="font-semibold">Backend</div>
                <div className="text-sm text-gray-600">Node.js, MongoDB, Redis, RESTful APIs</div>
              </Card>
              <Card className="p-4 border-l-4 border-purple-500">
                <div className="font-semibold">AI/ML</div>
                <div className="text-sm text-gray-600">TensorFlow, Python, Predictive Analytics</div>
              </Card>
              <Card className="p-4 border-l-4 border-orange-500">
                <div className="font-semibold">Infrastructure</div>
                <div className="text-sm text-gray-600">Vercel, AWS, Cloudflare, Auto-scaling</div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Data Sources</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-blue-50">
                <div className="font-semibold">Property Data</div>
                <div className="text-sm text-gray-600">MLS, Zillow API, County Records</div>
              </Card>
              <Card className="p-4 bg-green-50">
                <div className="font-semibold">Wealth Intelligence</div>
                <div className="text-sm text-gray-600">PeopleDataLabs, ZoomInfo, SEC Filings</div>
              </Card>
              <Card className="p-4 bg-purple-50">
                <div className="font-semibold">Market Data</div>
                <div className="text-sm text-gray-600">Census Bureau, Economic Indicators</div>
              </Card>
              <Card className="p-4 bg-orange-50">
                <div className="font-semibold">Geospatial</div>
                <div className="text-sm text-gray-600">Mapbox, Google Maps, HERE APIs</div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 text-center border-2 border-red-200 bg-red-50">
            <Shield className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-bold">Security</h3>
            <div className="text-sm text-gray-600">SOC 2, GDPR compliant, end-to-end encryption</div>
          </Card>
          <Card className="p-6 text-center border-2 border-blue-200 bg-blue-50">
            <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-bold">Performance</h3>
            <div className="text-sm text-gray-600">Sub-second response times, 99.9% uptime</div>
          </Card>
          <Card className="p-6 text-center border-2 border-green-200 bg-green-50">
            <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-bold">Scalability</h3>
            <div className="text-sm text-gray-600">Auto-scaling, CDN, global distribution</div>
          </Card>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Go-to-Market Strategy",
    subtitle: "Multi-Channel Approach for Rapid Market Penetration",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Phase 1: Launch (Months 1-6)</h3>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-blue-500">
                <div className="font-semibold">Target Market</div>
                <div className="text-sm text-gray-600">High-end real estate agents in major metros</div>
              </Card>
              <Card className="p-4 border-l-4 border-green-500">
                <div className="font-semibold">Strategy</div>
                <div className="text-sm text-gray-600">Direct sales, industry conferences, partnerships</div>
              </Card>
              <Card className="p-4 border-l-4 border-purple-500">
                <div className="font-semibold">Goal</div>
                <div className="text-sm text-gray-600">500 paying customers, $2.5M ARR</div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Phase 2: Scale (Months 7-18)</h3>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-orange-500">
                <div className="font-semibold">Expansion</div>
                <div className="text-sm text-gray-600">Wealth managers, property investors</div>
              </Card>
              <Card className="p-4 border-l-4 border-red-500">
                <div className="font-semibold">Channels</div>
                <div className="text-sm text-gray-600">Digital marketing, referral program, API partnerships</div>
              </Card>
              <Card className="p-4 border-l-4 border-indigo-500">
                <div className="font-semibold">Target</div>
                <div className="text-sm text-gray-600">5,000 customers, $15M ARR</div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center bg-blue-50 border-blue-200">
            <div className="text-2xl font-bold text-blue-600">Q1</div>
            <div className="text-sm">Product Launch</div>
            <div className="text-xs text-gray-600">Beta customers</div>
          </Card>
          <Card className="p-4 text-center bg-green-50 border-green-200">
            <div className="text-2xl font-bold text-green-600">Q2</div>
            <div className="text-sm">Market Entry</div>
            <div className="text-xs text-gray-600">500 customers</div>
          </Card>
          <Card className="p-4 text-center bg-purple-50 border-purple-200">
            <div className="text-2xl font-bold text-purple-600">Q3</div>
            <div className="text-sm">Rapid Growth</div>
            <div className="text-xs text-gray-600">2,000 customers</div>
          </Card>
          <Card className="p-4 text-center bg-orange-50 border-orange-200">
            <div className="text-2xl font-bold text-orange-600">Q4</div>
            <div className="text-sm">Scale & Expand</div>
            <div className="text-xs text-gray-600">5,000 customers</div>
          </Card>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Key Partnerships</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-semibold">MLS Providers</div>
              <div className="text-sm text-gray-600">Data integration partnerships</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Real Estate Brokerages</div>
              <div className="text-sm text-gray-600">White-label solutions</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Wealth Management Firms</div>
              <div className="text-sm text-gray-600">Cross-selling opportunities</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Financial Projections",
    subtitle: "Strong Unit Economics with Path to Profitability",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Revenue Growth</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">Year 1</div>
                    <div className="text-sm opacity-90">500 customers</div>
                  </div>
                  <div className="text-3xl font-bold">$2.5M</div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">Year 2</div>
                    <div className="text-sm opacity-90">2,500 customers</div>
                  </div>
                  <div className="text-3xl font-bold">$12M</div>
                </div>
              </Card>
              <Card className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">Year 3</div>
                    <div className="text-sm opacity-90">8,000 customers</div>
                  </div>
                  <div className="text-3xl font-bold">$45M</div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center bg-blue-50">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm">Gross Margin</div>
              </Card>
              <Card className="p-4 text-center bg-green-50">
                <div className="text-2xl font-bold text-green-600">$15K</div>
                <div className="text-sm">Customer LTV</div>
              </Card>
              <Card className="p-4 text-center bg-purple-50">
                <div className="text-2xl font-bold text-purple-600">$500</div>
                <div className="text-sm">Customer CAC</div>
              </Card>
              <Card className="p-4 text-center bg-orange-50">
                <div className="text-2xl font-bold text-orange-600">8mo</div>
                <div className="text-sm">Payback Period</div>
              </Card>
            </div>
            
            <Card className="p-4 bg-gray-50">
              <h4 className="font-bold mb-2">Monthly Churn Rate</h4>
              <div className="text-2xl font-bold text-green-600">2.5%</div>
              <div className="text-sm text-gray-600">Industry-leading retention</div>
            </Card>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Path to Profitability</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">Year 1</div>
              <div className="text-sm text-gray-600">Investment Phase</div>
              <div className="text-lg font-semibold">-$3M</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">Year 2</div>
              <div className="text-sm text-gray-600">Break-even</div>
              <div className="text-lg font-semibold">$0</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">Year 3</div>
              <div className="text-sm text-gray-600">Profitable</div>
              <div className="text-lg font-semibold">+$15M</div>
            </div>
          </div>
        
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Exit Strategy</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-semibold">Strategic Acquisition</div>
              <div className="text-sm text-gray-600">Zillow, Realtor.com, or major brokerage</div>
              <div className="text-lg font-bold text-blue-600">$300M+ (Year 4-5)</div>
            </div>
            <div>
              <div className="font-semibold">IPO</div>
              <div className="text-sm text-gray-600">Public offering with strong growth metrics</div>
              <div className="text-lg font-bold text-green-600">$500M+ (Year 5-7)</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "Funding Requirements",
    subtitle: "Series A: $5M to Accelerate Growth and Market Expansion",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Use of Funds</h3>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Product Development</div>
                    <div className="text-sm text-gray-600">AI/ML, mobile app, enterprise features</div>
                  </div>
                  <div className="text-xl font-bold text-blue-600">$1.5M</div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Sales & Marketing</div>
                    <div className="text-sm text-gray-600">Team expansion, digital marketing</div>
                  </div>
                  <div className="text-xl font-bold text-green-600">$2M</div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Data & Infrastructure</div>
                    <div className="text-sm text-gray-600">Premium data sources, scaling</div>
                  </div>
                  <div className="text-xl font-bold text-purple-600">$1M</div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-orange-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Operations</div>
                    <div className="text-sm text-gray-600">Legal, compliance, working capital</div>
                  </div>
                  <div className="text-xl font-bold text-orange-600">$500K</div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Milestones</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-blue-50">
                <div className="font-semibold">6 Months</div>
                <div className="text-sm text-gray-600">500 paying customers, mobile app launch</div>
              </Card>
              <Card className="p-4 bg-green-50">
                <div className="font-semibold">12 Months</div>
                <div className="text-sm text-gray-600">2,500 customers, enterprise partnerships</div>
              </Card>
              <Card className="p-4 bg-purple-50">
                <div className="font-semibold">18 Months</div>
                <div className="text-sm text-gray-600">Break-even, Series B readiness</div>
              </Card>
              <Card className="p-4 bg-orange-50">
                <div className="font-semibold">24 Months</div>
                <div className="text-sm text-gray-600">Market leadership, international expansion</div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 text-center border-2 border-blue-200 bg-blue-50">
            <div className="text-3xl font-bold text-blue-600">$5M</div>
            <div className="font-semibold">Series A</div>
            <div className="text-sm text-gray-600">18-month runway</div>
          </Card>
          <Card className="p-6 text-center border-2 border-green-200 bg-green-50">
            <div className="text-3xl font-bold text-green-600">15%</div>
            <div className="font-semibold">Equity</div>
            <div className="text-sm text-gray-600">Post-money valuation: $33M</div>
          </Card>
          <Card className="p-6 text-center border-2 border-purple-200 bg-purple-50">
            <div className="text-3xl font-bold text-purple-600">10x</div>
            <div className="font-semibold">ROI Potential</div>
            <div className="text-sm text-gray-600">Based on comparable exits</div>
          </Card>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Exit Strategy</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="font-semibold">Strategic Acquisition</div>
              <div className="text-sm text-gray-600">Zillow, Realtor.com, or major brokerage</div>
              <div className="text-lg font-bold text-blue-600">$300M+ (Year 4-5)</div>
            </div>
            <div>
              <div className="font-semibold">IPO</div>
              <div className="text-sm text-gray-600">Public offering with strong growth metrics</div>
              <div className="text-lg font-bold text-green-600">$500M+ (Year 5-7)</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "Team & Advisors",
    subtitle: "Experienced Leadership with Proven Track Record",
    content: (
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Core Team</h3>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-blue-500">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">CEO</span>
                  </div>
                  <div>
                    <div className="font-semibold">Chief Executive Officer</div>
                    <div className="text-sm text-gray-600">15+ years real estate tech, former VP at Zillow</div>
                    <div className="text-xs text-blue-600">Stanford MBA, 2 successful exits</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-green-500">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">CTO</span>
                  </div>
                  <div>
                    <div className="font-semibold">Chief Technology Officer</div>
                    <div className="text-sm text-gray-600">AI/ML expert, former Google engineer</div>
                    <div className="text-xs text-green-600">MIT PhD, 50+ patents</div>
                  </div>
                </div>
              </Card>
              <Card className="p-4 border-l-4 border-purple-500">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">CPO</span>
                  </div>
                  <div>
                    <div className="font-semibold">Chief Product Officer</div>
                    <div className="text-sm text-gray-600">Product strategy, former Airbnb PM</div>
                    <div className="text-xs text-purple-600">Berkeley CS, 10+ years product</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Advisory Board</h3>
            <div className="space-y-4">
              <Card className="p-4 bg-blue-50">
                <div className="font-semibold">Real Estate Industry</div>
                <div className="text-sm text-gray-600">Former CEO of major brokerage</div>
                <div className="text-xs text-blue-600">40+ years industry experience</div>
              </Card>
              <Card className="p-4 bg-green-50">
                <div className="font-semibold">Wealth Management</div>
                <div className="text-sm text-gray-600">Managing Director at top investment firm</div>
                <div className="text-xs text-green-600">$50B+ assets under management</div>
              </Card>
              <Card className="p-4 bg-purple-50">
                <div className="font-semibold">Technology</div>
                <div className="text-sm text-gray-600">Former VP Engineering at unicorn startup</div>
                <div className="text-xs text-purple-600">3 successful exits, scaling expert</div>
              </Card>
              <Card className="p-4 bg-orange-50">
                <div className="font-semibold">Go-to-Market</div>
                <div className="text-sm text-gray-600">Former CMO at SaaS company</div>
                <div className="text-xs text-orange-600">$0-$100M revenue growth</div>
              </Card>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 text-center bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm">Years Combined Experience</div>
          </Card>
          <Card className="p-4 text-center bg-green-50">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm">Successful Exits</div>
          </Card>
          <Card className="p-4 text-center bg-purple-50">
            <div className="text-2xl font-bold text-purple-600">$2B+</div>
            <div className="text-sm">Value Created</div>
          </Card>
          <Card className="p-4 text-center bg-orange-50">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-sm">Committed Full-Time</div>
          </Card>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Why This Team Wins</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <div className="font-semibold">Domain Expertise</div>
              <div className="text-sm text-gray-600">Deep real estate and wealth management knowledge</div>
            </div>
            <div className="text-center">
              <Rocket className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <div className="font-semibold">Execution Track Record</div>
              <div className="text-sm text-gray-600">Proven ability to scale technology companies</div>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <div className="font-semibold">Network & Relationships</div>
              <div className="text-sm text-gray-600">Strong connections in target markets</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Call to Action",
    subtitle: "Join Us in Revolutionizing Real Estate Intelligence",
    content: (
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            The Future of Real Estate is Here
          </div>
          <div className="text-xl text-gray-600 max-w-3xl mx-auto">
            TrueEstate combines property intelligence with wealth analytics to create the most powerful 
            real estate platform ever built. We're not just changing how people search for properties—we're 
            revolutionizing how they understand value, opportunity, and investment potential.
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 my-12">
          <Card className="p-6 border-2 border-blue-200 bg-blue-50">
            <div className="text-3xl font-bold text-blue-600 mb-2">$45B+</div>
            <div className="font-semibold">Market Opportunity</div>
            <div className="text-sm text-gray-600">Massive addressable market with clear growth trajectory</div>
          </Card>
          <Card className="p-6 border-2 border-green-200 bg-green-50">
            <div className="text-3xl font-bold text-green-600 mb-2">First Mover</div>
            <div className="font-semibold">Competitive Advantage</div>
            <div className="text-sm text-gray-600">Unique wealth intelligence platform with no direct competitors</div>
          </Card>
          <Card className="p-6 border-2 border-purple-200 bg-purple-50">
            <div className="text-3xl font-bold text-purple-600 mb-2">10x ROI</div>
            <div className="font-semibold">Investment Potential</div>
            <div className="text-sm text-gray-600">Strong unit economics with clear path to profitability</div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <div className="text-2xl font-bold text-gray-800">
            Ready to Transform Real Estate Together?
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              <Rocket className="w-5 h-5 mr-2" />
              Invest in TrueEstate
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
              <ArrowRight className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          
          <div className="text-gray-600">
            Contact us: <span className="font-semibold text-blue-600">invest@trueestate.com</span> | 
            <span className="font-semibold text-blue-600"> +1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            "TrueEstate is positioned to become the Bloomberg Terminal of real estate—
            providing unprecedented intelligence that transforms how professionals make decisions."
          </div>
          <div className="text-sm text-gray-600">
            — Industry Analyst, Real Estate Technology Report 2024
          </div>
        </div>
      </div>
    )
  }
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrueEstate
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Pitch Deck
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Slide {currentSlide + 1} of {slides.length}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card className="min-h-[600px] shadow-lg">
          <CardContent className="p-8">
            {/* Slide Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{slides[currentSlide].title}</h1>
              <p className="text-xl text-gray-600">{slides[currentSlide].subtitle}</p>
            </div>

            {/* Slide Content */}
            <div className="mb-8">{slides[currentSlide].content}</div>
          </CardContent>
        </Card>

        {/* Slide Navigation */}
        <div className="mt-8">
          <div className="flex justify-center space-x-2 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></button>
            ))}
          </div>

          {/* Slide Titles */}
          <div className="grid grid-cols-4 gap-2 text-xs">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`p-2 text-left rounded transition-colors ${
                  index === currentSlide ? "bg-blue-100 text-blue-800 font-semibold" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <span>Print Deck</span>
            </Button>
            <Button variant="outline" size="sm">
              <span>Export PDF</span>
            </Button>
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
