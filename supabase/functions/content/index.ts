
import { corsHeaders } from '../_shared/cors.ts';
import { getEntity } from '../_shared/entity.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }
  try {
    const { environmentIds, languages } = await req.json();
    const response: any = {};

    for (let i = 0; i < environmentIds.length; i++) {
      const envId = environmentIds[i];
      const contentList = await getEntity('environment', envId, 'translation', {
        show_level_ids: 'true',
        with_definitions: 'true',
      })
      const languageFilter: any = {}
      for (let x = 0; x < languages.length; x++) {
        const lang = languages[x];
        languageFilter[lang] =  contentList.default[lang] || {};
      }
      contentList.default = languageFilter;

      response[envId] = contentList;
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
})