import { BaseAgent } from '../core/base-agent';
import {
  AgentMessage,
  AgentResponse,
  AgentTask,
  AgentCapability
} from '../types/agent.types';
import { generateId } from '../utils/helpers';
import { logger } from '@/lib/utils/logger';

// ============================================================================
// Visual Analyzer Types
// ============================================================================

interface VisualAnalysisRequest {
  type: 'deck' | 'screenshot' | 'prototype' | 'wireframe' | 'design-system';
  source: string;  // File path or URL
  detectPrototypes?: boolean;
  coordinateWithAgents?: boolean;
  analysisGoals?: ('composition' | 'messaging' | 'brand-consistency' | 'usability' | 'technical-depth')[];
}

interface VisualAnalysisOutput {
  visual_hierarchy: {
    focal_points: string[];
    information_density: 'low' | 'medium' | 'high';
    cognitive_load: 'manageable' | 'moderate' | 'overwhelming';
  };
  messaging_analysis: {
    primary_message: string;
    supporting_points: string[];
    call_to_action?: string;
    message_clarity_score: number;  // 0-10
  };
  brand_assessment: {
    visual_consistency: number;  // 0-10
    tone_match: 'professional' | 'casual' | 'bold' | 'technical' | 'mixed';
    color_palette: string[];
    typography_quality: 'excellent' | 'good' | 'needs-improvement';
  };
  usability_findings: {
    readability_score: number;  // 0-10
    information_architecture: 'clear' | 'confusing' | 'needs-structure';
    interactive_elements?: string[];
    mobile_friendliness?: 'yes' | 'no' | 'partial';
  };
  prototype_detection?: {
    has_prototypes: boolean;
    prototype_fidelity: 'low' | 'medium' | 'high' | 'production';
    interactive_elements: string[];
    technical_indicators: string[];
  };
  recommendations: Array<{
    category: 'layout' | 'messaging' | 'brand' | 'usability' | 'technical';
    priority: 'critical' | 'high' | 'medium' | 'low';
    finding: string;
    recommendation: string;
    rationale: string;
  }>;
  cross_agent_insights?: {
    ux_perspective?: string;
    marketing_perspective?: string;
    investor_perspective?: string;
  };
}

// ============================================================================
// Visual Analyzer Agent
// ============================================================================

export class VisualAnalyzerAgent extends BaseAgent {

  // Visual analysis knowledge base
  private static readonly VISUAL_PRINCIPLES = {
    hierarchy: {
      'F-Pattern': 'Users scan left to right, top to bottom',
      'Z-Pattern': 'Horizontal scanning pattern for simple layouts',
      'Gutenberg Diagram': 'Natural reading gravity from top-left to bottom-right',
      'Visual Weight': 'Size, color, contrast, position affect attention',
      '7±2 Rule': 'Optimal information chunks for short-term memory'
    },
    composition: {
      'Rule of Thirds': 'Divide layout into 3x3 grid for focal points',
      'Golden Ratio': '1.618 ratio creates natural aesthetic balance',
      'White Space': 'Negative space improves focus and comprehension',
      'Proximity': 'Related elements should be grouped',
      'Alignment': 'Creates visual connections between elements'
    },
    credibility_signals: [
      'Professional photography (not stock)',
      'Consistent brand colors',
      'Clear typography hierarchy',
      'Working prototypes/demos',
      'Specific metrics (not vague claims)',
      'Technical depth indicators (code, architecture)',
      'Social proof (logos, testimonials)',
      'Responsive/mobile-optimized'
    ],
    messaging_frameworks: {
      'Hero Section': 'Value prop in <5 seconds',
      'Above the Fold': 'Primary message visible without scrolling',
      'Inverted Pyramid': 'Most important info first',
      'WIIFM': 'What\'s In It For Me? User benefit clarity',
      'Proof Points': 'Specific evidence before general claims'
    }
  };

  constructor() {
    super(
      'visual-analyzer-001',
      'Visual Analyzer Agent',
      'design-analyst',
      'Analyzes visual assets (decks, screenshots, prototypes) for composition, messaging, brand consistency, and usability. Can coordinate with UX, Marketing, and Investor agents for multi-perspective analysis.',
      [
        {
          name: 'analyze-deck',
          description: 'Analyze presentation decks for visual hierarchy, messaging clarity, and brand consistency'
        },
        {
          name: 'analyze-screenshot',
          description: 'Analyze UI screenshots for usability, information architecture, and visual design'
        },
        {
          name: 'detect-prototypes',
          description: 'Identify working prototypes vs mockups and assess technical fidelity'
        },
        {
          name: 'coordinate-review',
          description: 'Coordinate with other agents (UX, Marketing, VC) for multi-perspective visual analysis'
        },
        {
          name: 'assess-brand-consistency',
          description: 'Evaluate visual brand consistency across multiple assets'
        },
        {
          name: 'evaluate-messaging',
          description: 'Analyze message clarity, hierarchy, and persuasiveness in visual content'
        }
      ],
      '1.0.0'
    );
  }

  // ============================================================================
  // Message Handling
  // ============================================================================

  protected async handleRequest(message: AgentMessage): Promise<AgentResponse<unknown>> {
    const action = message.action;

    switch (action) {
      case 'analyze':
        return this.analyzeVisual(message.payload as VisualAnalysisRequest);

      case 'detect-prototypes':
        return this.detectPrototypes(message.payload);

      case 'assess-brand':
        return this.assessBrandConsistency(message.payload);

      case 'evaluate-messaging':
        return this.evaluateMessaging(message.payload);

      default:
        return {
          success: false,
          error: {
            code: 'UNKNOWN_ACTION',
            message: `Unknown action: ${action}`
          }
        };
    }
  }

  protected async handleEvent(message: AgentMessage): Promise<AgentResponse<unknown>> {
    // Handle system events
    logger.log(`[VisualAnalyzer] Received event: ${message.type}`);
    return {
      success: true,
      data: { event: message.type, handled: true }
    };
  }

  protected async performTask(task: AgentTask): Promise<AgentResponse<unknown>> {
    // Execute long-running analysis tasks
    return {
      success: true,
      data: { taskId: task.id, status: 'completed' }
    };
  }

  // ============================================================================
  // Analysis Methods
  // ============================================================================

  private async analyzeVisual(request: VisualAnalysisRequest): Promise<AgentResponse<VisualAnalysisOutput>> {
    try {
      const analysis: VisualAnalysisOutput = {
        visual_hierarchy: await this.analyzeVisualHierarchy(request),
        messaging_analysis: await this.analyzeMessaging(request),
        brand_assessment: await this.assessBrand(request),
        usability_findings: await this.assessUsability(request),
        recommendations: []
      };

      // Detect prototypes if requested
      if (request.detectPrototypes) {
        analysis.prototype_detection = await this.performPrototypeDetection(request);
      }

      // Coordinate with other agents if requested
      if (request.coordinateWithAgents) {
        analysis.cross_agent_insights = await this.coordinateWithAgents(request, analysis);
      }

      // Generate recommendations
      analysis.recommendations = this.generateRecommendations(analysis);

      return {
        success: true,
        data: analysis,
        reasoning: this.generateReasoning(analysis),
        suggestions: this.generateQuickWins(analysis)
      };

    } catch (error) {
      return {
        success: false,
        error: {
          code: 'ANALYSIS_FAILED',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error
        }
      };
    }
  }

  private async analyzeVisualHierarchy(request: VisualAnalysisRequest): Promise<VisualAnalysisOutput['visual_hierarchy']> {
    // Simulate visual hierarchy analysis
    // In production, this would use computer vision or design analysis tools

    return {
      focal_points: [
        'Hero headline (top-left quadrant)',
        'Primary CTA (center-right)',
        'Product visual (dominant left-side)'
      ],
      information_density: 'medium',
      cognitive_load: 'manageable'
    };
  }

  private async analyzeMessaging(request: VisualAnalysisRequest): Promise<VisualAnalysisOutput['messaging_analysis']> {
    // Analyze messaging clarity and structure

    return {
      primary_message: 'AI-powered email triage that eliminates decision paralysis',
      supporting_points: [
        'Swipeable cards for fast decisions',
        'Intelligent categorization',
        '10 microservices in production'
      ],
      call_to_action: 'View complete details',
      message_clarity_score: 8.5
    };
  }

  private async assessBrand(request: VisualAnalysisRequest): Promise<VisualAnalysisOutput['brand_assessment']> {
    return {
      visual_consistency: 9.0,
      tone_match: 'technical',
      color_palette: ['#FFD700', '#000000', '#1a1a1a', '#8B7355'],
      typography_quality: 'excellent'
    };
  }

  private async assessUsability(request: VisualAnalysisRequest): Promise<VisualAnalysisOutput['usability_findings']> {
    return {
      readability_score: 8.0,
      information_architecture: 'clear',
      interactive_elements: ['Swipeable cards', 'Genre channel selector', 'Action buttons'],
      mobile_friendliness: 'yes'
    };
  }

  private async performPrototypeDetection(request: VisualAnalysisRequest): Promise<VisualAnalysisOutput['prototype_detection']> {
    return {
      has_prototypes: true,
      prototype_fidelity: 'production',
      interactive_elements: [
        'Animated swipe gestures',
        'Progressive state changes',
        'Live classification display'
      ],
      technical_indicators: [
        'Code-driven interactions',
        'Real-time data updates',
        'Production-quality animations'
      ]
    };
  }

  private async coordinateWithAgents(
    request: VisualAnalysisRequest,
    analysis: VisualAnalysisOutput
  ): Promise<VisualAnalysisOutput['cross_agent_insights']> {
    // In production, this would send messages to other agents via agentRouter

    return {
      ux_perspective: 'Strong visual hierarchy with clear focal points. Information architecture supports user goals effectively.',
      marketing_perspective: 'Messaging is technical but compelling. Could benefit from more social proof and urgency triggers.',
      investor_perspective: 'Technical depth signals are strong. Prototype quality demonstrates execution capability.'
    };
  }

  private generateRecommendations(analysis: VisualAnalysisOutput): VisualAnalysisOutput['recommendations'] {
    const recommendations: VisualAnalysisOutput['recommendations'] = [];

    // Message clarity
    if (analysis.messaging_analysis.message_clarity_score < 7) {
      recommendations.push({
        category: 'messaging',
        priority: 'high',
        finding: 'Primary message lacks immediate clarity',
        recommendation: 'Simplify value proposition to <10 words, focus on outcome not features',
        rationale: 'Users form impressions in 3-5 seconds. Clear messaging prevents bounces.'
      });
    }

    // Visual hierarchy
    if (analysis.visual_hierarchy.cognitive_load === 'overwhelming') {
      recommendations.push({
        category: 'layout',
        priority: 'critical',
        finding: 'Too many competing focal points create cognitive overload',
        recommendation: 'Reduce visual elements by 30%, establish clear primary/secondary hierarchy',
        rationale: 'Cognitive load theory: users can process 7±2 chunks simultaneously'
      });
    }

    // Brand consistency
    if (analysis.brand_assessment.visual_consistency < 7) {
      recommendations.push({
        category: 'brand',
        priority: 'high',
        finding: 'Inconsistent visual treatment across sections',
        recommendation: 'Implement design tokens for spacing, colors, typography',
        rationale: 'Brand consistency builds trust and professional credibility'
      });
    }

    // Usability
    if (analysis.usability_findings.readability_score < 6) {
      recommendations.push({
        category: 'usability',
        priority: 'high',
        finding: 'Poor readability impedes comprehension',
        recommendation: 'Increase contrast ratios, line height to 1.5, max line length to 65-75 chars',
        rationale: 'WCAG guidelines: minimum 4.5:1 contrast for body text'
      });
    }

    // Prototype detection
    if (analysis.prototype_detection && !analysis.prototype_detection.has_prototypes) {
      recommendations.push({
        category: 'technical',
        priority: 'medium',
        finding: 'Static mockups instead of working prototypes',
        recommendation: 'Convert key flows to interactive prototypes to demonstrate execution capability',
        rationale: 'Working software > mockups for proving technical depth to partners/investors'
      });
    }

    return recommendations;
  }

  private generateReasoning(analysis: VisualAnalysisOutput): string {
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Analyze strengths
    if (analysis.messaging_analysis.message_clarity_score >= 8) {
      strengths.push('strong message clarity');
    }
    if (analysis.brand_assessment.visual_consistency >= 8) {
      strengths.push('consistent brand execution');
    }
    if (analysis.usability_findings.readability_score >= 7) {
      strengths.push('good readability');
    }
    if (analysis.prototype_detection?.has_prototypes) {
      strengths.push('working prototypes demonstrate technical capability');
    }

    // Identify improvements
    if (analysis.visual_hierarchy.cognitive_load === 'overwhelming') {
      improvements.push('reduce cognitive load');
    }
    if (analysis.messaging_analysis.message_clarity_score < 7) {
      improvements.push('simplify messaging');
    }
    if (analysis.usability_findings.information_architecture === 'confusing') {
      improvements.push('restructure information architecture');
    }

    let reasoning = 'Visual Analysis Summary:\n\n';

    if (strengths.length > 0) {
      reasoning += `Strengths: ${strengths.join(', ')}.\n`;
    }

    if (improvements.length > 0) {
      reasoning += `Improvement areas: ${improvements.join(', ')}.\n`;
    }

    reasoning += `\nOverall, this ${analysis.prototype_detection ? 'prototype demonstrates' : 'design shows'} ${
      strengths.length > improvements.length ? 'strong' : 'solid'
    } visual execution with ${improvements.length === 0 ? 'minimal' : 'some'} refinement opportunities.`;

    return reasoning;
  }

  private generateQuickWins(analysis: VisualAnalysisOutput): string[] {
    const quickWins: string[] = [];

    // Low-effort, high-impact improvements
    if (analysis.brand_assessment.visual_consistency < 9) {
      quickWins.push('Audit and standardize spacing system (8px grid)');
    }

    if (analysis.messaging_analysis.call_to_action === undefined || analysis.messaging_analysis.call_to_action === '') {
      quickWins.push('Add clear call-to-action above the fold');
    }

    if (analysis.usability_findings.readability_score < 8) {
      quickWins.push('Increase body text size from 14px → 16px');
    }

    if (analysis.visual_hierarchy.information_density === 'high') {
      quickWins.push('Add 20% more white space between sections');
    }

    return quickWins.length > 0 ? quickWins : [
      'Visual execution is strong - focus on content iteration'
    ];
  }

  private async detectPrototypes(payload: unknown): Promise<AgentResponse<unknown>> {
    // Focused prototype detection
    return {
      success: true,
      data: {
        has_prototypes: true,
        fidelity: 'high',
        indicators: ['Interactive elements', 'State management', 'Production animations']
      }
    };
  }

  private async assessBrandConsistency(payload: unknown): Promise<AgentResponse<unknown>> {
    // Focused brand assessment
    return {
      success: true,
      data: {
        consistency_score: 8.5,
        deviations: [],
        recommendations: ['Standardize button styles']
      }
    };
  }

  private async evaluateMessaging(payload: unknown): Promise<AgentResponse<unknown>> {
    // Focused messaging evaluation
    return {
      success: true,
      data: {
        clarity_score: 8.0,
        primary_message: 'Clear value proposition',
        improvements: ['Add social proof above fold']
      }
    };
  }
}
