import React from 'react'
import {MockedProvider} from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'
import wait from 'waait'

import Summary from '../Summary'

const mockManifest = 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/9cca8fdd-4a61-4429-8ac1-f648764b4d6d.json'

it("should render without error", () => {
  renderer.create(<MockedProvider mocks={[]}>
    <Summary manifestId={mockManifest}/>
  </MockedProvider>)
})

it("should render loading state initially", () => {
  const component = renderer.create(<MockedProvider mocks={[]}>
    <Summary manifestId={mockManifest}/>
  </MockedProvider>)
  const tree = component.toJSON()
  expect(tree.children).toContain("Loading...")
})

it("should render summary", async () => {
  const mocks = [{
    request: {
      query: Summary.query(), variables: {
        manifestId: mockManifest,
      },
    }, result: {
      data: {
        manifest: {
          "summary": "[Handbill of Mr. Becket, [1787] ]"
        }
      },
    },
  },]

  const component = renderer.create(<MockedProvider mocks={mocks} addTypename={false}>
    <Summary manifestId={mockManifest}/>
  </MockedProvider>)

  await wait(0)

  const li = component.root.findByType("li")
  expect(li.children).toContain("[Handbill of Mr. Becket, [1787] ]")
})

it("should show error UI", async () => {
  const summaryMock = {
    request: {
      query: Summary.query(), variables: {
        manifestId: mockManifest,
      },
    },
    error: new Error()
  }

  const component = renderer.create(
    <MockedProvider mocks={[summaryMock]} addTypename={false}>
      <Summary manifestId={mockManifest}/>
    </MockedProvider>)

  await wait(0)
  const tree = component.toJSON()
  expect(tree.children).toContain("Network error: ")
})
