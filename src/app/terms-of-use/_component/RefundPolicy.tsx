"use client";

import { useGeneralSettings } from "@src/components/lib/woocommerce";
import React from "react";

const RefundPolicy = () => {
  const { data: generalSettings, isLoading, isError } = useGeneralSettings();
  const GeneralSettings: WooCommerceSetting[] = generalSettings;

  return (
    <div id="refundPolicy" className="text-[#667085]">
      <h3 className="font-semibold text-sm md:text-base xl:text-lg mb-2">
        REFUND POLICY - MICHIGAN INSTRUMENT LIMITED
      </h3>
      <p className="text-xs md:text-sm xl:text-base mb-4">
        Effective Date: {new Date().toLocaleDateString("en-GB")}
      </p>

      <p className="text-xs md:text-sm xl:text-base mb-4">
        At Michigan Instrument Limited, we are committed to providing
        high-quality professional digital content and educational resources that
        meet the needs of professionals, educators, and institutions. Our refund
        policy reflects our dedication to educational excellence and customer
        satisfaction.
      </p>

      <ul className="list-disc pl-5 space-y-3 leading-[1.8] text-xs md:text-sm xl:text-base">
        <li>
          <span className="font-medium">1. Professional Content Refunds</span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              30-day satisfaction guarantee for all professional and educational
              content
            </li>
            <li>
              Full refund for content that doesn&apos;t meet advertised
              professional standards
            </li>
            <li>
              Educational effectiveness refunds if content doesn&apos;t achieve
              stated learning objectives
            </li>
            <li>
              Technical quality refunds for content with significant production
              or accuracy issues
            </li>
            <li>
              Compatibility refunds for content that cannot function on
              supported professional systems
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            2. Educational Institution Refunds
          </span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Extended 60-day evaluation period for institutional volume
              licenses
            </li>
            <li>
              Prorated refunds for unused institutional access during
              subscription periods
            </li>
            <li>
              Curriculum integration refunds if content cannot be effectively
              integrated into existing programs
            </li>
            <li>
              Student engagement refunds if content doesn&apos;t achieve minimum
              engagement thresholds
            </li>
            <li>
              Accreditation compliance refunds if content doesn&apos;t meet
              stated educational standards
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            3. Professional Development Refunds
          </span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Continuing education credit refunds if promised credits cannot be
              obtained
            </li>
            <li>
              Certification preparation refunds for materials that don&apos;t
              adequately prepare for stated exams
            </li>
            <li>
              Professional competency refunds if content doesn&apos;t develop
              advertised skills
            </li>
            <li>
              Corporate training refunds for programs not meeting organizational
              learning objectives
            </li>
            <li>
              Professional consultation refunds for advisory services not
              meeting agreed scope
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            4. Non-Refundable Educational Services
          </span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Successfully completed educational programs with issued
              certificates or credits
            </li>
            <li>
              Custom content development services delivered according to
              specifications
            </li>
            <li>
              Professional consultation services completed within agreed
              parameters
            </li>
            <li>
              Content accessed and used beyond evaluation period without
              reported issues
            </li>
            <li>
              Institutional licensing after successful implementation and user
              adoption
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            5. Educational Refund Request Process
          </span>
          <p className="mt-1">
            To request refunds for educational content and services:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Email: refunds@michiganinstrument.com.ng</li>
            <li>Educational Support: +234-801-234-5014 (ext. 200)</li>
            <li>
              Provide detailed learning objectives and outcome expectations
            </li>
            <li>
              Include usage analytics and student/professional feedback when
              applicable
            </li>
            <li>
              Submit educational effectiveness assessment for institutional
              requests
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">6. Educational Quality Assessment</span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Expert review of all educational content refund requests by
              subject matter specialists
            </li>
            <li>
              Learning outcome analysis and educational effectiveness evaluation
            </li>
            <li>
              Professional standard verification and industry relevance
              assessment
            </li>
            <li>
              Institutional consultation to explore alternative educational
              solutions
            </li>
            <li>
              Independent educational review for disputed curriculum
              effectiveness
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            7. Alternative Educational Solutions
          </span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Content exchange for alternative educational materials better
              suited to learning objectives
            </li>
            <li>
              Educational credits applicable to future professional development
              purchases
            </li>
            <li>
              Supplementary content provision to enhance learning outcomes
            </li>
            <li>
              Extended access periods and additional educational support
              services
            </li>
            <li>
              Custom educational consultation to optimize content effectiveness
            </li>
          </ul>
        </li>

        <li>
          <span className="font-medium">
            8. Institutional & Professional Protections
          </span>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>
              Educational outcome guarantees for institutional implementations
            </li>
            <li>
              Professional development ROI protection for corporate training
              programs
            </li>
            <li>
              Accreditation compliance insurance for educational institution
              usage
            </li>
            <li>
              Learning effectiveness guarantees with measurable outcome criteria
            </li>
          </ul>
        </li>
      </ul>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-xs md:text-sm xl:text-base mb-2">
          Contact Information
        </h4>
        <p className="text-xs md:text-sm xl:text-base">
          For educational content refunds and support:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm xl:text-base">
          <li>Michigan Instrument Limited</li>
          <li>Email: refunds@michiganinstrument.com.ng</li>
          <li>Educational Support: education@michiganinstrument.com.ng</li>
          <li>Phone: +234-801-234-5014</li>
          <li>Website: www.michiganinstrument.com.ng</li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicy;
