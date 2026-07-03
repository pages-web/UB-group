import { gql } from "@apollo/client";

export const WIDGETS_LEAD_CONNECT = gql`
  mutation WidgetsLeadConnect(
    $channelId: String!
    $formCode: String!
    $cachedCustomerId: String
  ) {
    widgetsLeadConnect(
      channelId: $channelId
      formCode: $formCode
      cachedCustomerId: $cachedCustomerId
    ) {
      form {
        _id
        code
        title
        fields {
          _id
          text
          type
          order
          isRequired
        }
      }
    }
  }
`;

export const WIDGETS_SAVE_LEAD = gql`
  mutation WidgetsSaveLead(
    $formId: String!
    $submissions: [FieldValueInput]
    $browserInfo: JSON!
    $cachedCustomerId: String
  ) {
    widgetsSaveLead(
      formId: $formId
      submissions: $submissions
      browserInfo: $browserInfo
      cachedCustomerId: $cachedCustomerId
    ) {
      status
      conversationId
      customerId
      errors {
        fieldId
        code
        text
      }
    }
  }
`;

export const CP_CREATE_TICKET = gql`
  mutation CpCreateTicket(
    $name: String!
    $channelId: String!
    $pipelineId: String!
    $statusId: String!
    $description: String
    $stageId: String
    $priority: Int
    $labelIds: [String]
    $tagIds: [String]
    $startDate: Date
    $targetDate: Date
    $assigneeId: String
    $state: String
    $propertiesData: JSON
    $attachments: [AttachmentInput]
  ) {
    cpCreateTicket(
      name: $name
      channelId: $channelId
      pipelineId: $pipelineId
      statusId: $statusId
      description: $description
      stageId: $stageId
      priority: $priority
      labelIds: $labelIds
      tagIds: $tagIds
      startDate: $startDate
      targetDate: $targetDate
      assigneeId: $assigneeId
      state: $state
      propertiesData: $propertiesData
      attachments: $attachments
    ) {
      _id
    }
  }
`;
